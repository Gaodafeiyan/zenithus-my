const { factories } = require('@strapi/strapi');
const { Decimal } = require('decimal.js');

module.exports = factories.createCoreService('api::subscription-order.subscription-order', ({ strapi }) => ({
  // ➊ 创建订单（含购买次数 / 解锁规则校验）
  async createWithChecks(userId, planId) {
    const plan = await strapi.entityService.findOne('api::subscription-plan.subscription-plan', planId);
    if (!plan?.enabled) throw new Error('PLAN_DISABLED');

    // 1) 校验解锁 / 次数
    const finishedCnt = await strapi.db.query('api::subscription-order.subscription-order').count({
      where: { user: userId, plan: planId, orderState: 'finished' },
    });
    if (plan.unlockAfterCnt && finishedCnt < plan.unlockAfterCnt) throw new Error('PLAN_LOCKED');
    if (finishedCnt >= plan.maxPurchaseCnt) throw new Error('PURCHASE_LIMIT');

    // 2) 校验余额
    await strapi.service('api::wallet-balance.wallet-balance').deduct(userId, plan.priceUSDT, { txType: 'subscription' });

    // 3) 写订单
    const start = new Date();
    const end   = new Date(start.getTime() + plan.cycleDays * 86400_000);

    return await strapi.entityService.create('api::subscription-order.subscription-order', {
      data: {
        principalUSDT : plan.priceUSDT,
        startAt       : start,
        endAt         : end,
        aiTokenQty    : new Decimal(plan.priceUSDT).mul(plan.aiTokenBonusPct).div(100).toFixed(4),
        user          : userId,
        plan          : planId,
      },
    });
  },

  // ➋ 赎回（订单到期／手动触发），计算分润
  async redeem(orderId) {
    const order = await strapi.entityService.findOne('api::subscription-order.subscription-order', orderId, { populate: { user: true, plan: true } });
    if (order.orderState === 'finished') return order;

    const staticProfit = new Decimal(order.principalUSDT).mul(order.plan.staticYieldPct).div(100).toFixed(4);

    // a. 静态收益 + 本金回钱包
    await strapi.service('api::wallet-balance.wallet-balance').add(order.user.id, staticProfit, { txType: 'static' });
    await strapi.service('api::wallet-balance.wallet-balance').add(order.user.id, order.principalUSDT, { txType: 'principal_return' });

    // b. 返佣（只有 1 层直推）
    const inviterId = order.user.invitedBy?.id;
    if (inviterId) {
      const rate = order.plan.referralPct;
      const reward = new Decimal(staticProfit).mul(rate).div(100).toFixed(4);
      await strapi.entityService.create('api::referral-reward.referral-reward', {
        data: { referrer: inviterId, fromUser: order.user.id, fromOrder: order.id, amountUSDT: reward },
      });
      await strapi.service('api::wallet-balance.wallet-balance').add(inviterId, reward, { txType: 'referral' });
    }

    // c. 更新订单
    return await strapi.entityService.update('api::subscription-order.subscription-order', orderId, {
      data: { orderState: 'finished', staticYieldUSDT: staticProfit },
    });
  },
})); 