'use strict';

const dayjs = require('dayjs');

module.exports = () => ({
  async createOrder(userId, planId) {
    // 1) 读计划
    const plan = await strapi.entityService.findOne('api::subscription-plan.subscription-plan', planId);

    // 2) 校验购买次数 & 解锁
    await strapi.service('api::subscription-order.subscription-order')._checkLimit(userId, plan);

    // 3) 扣余额
    await strapi.service('api::wallet-balance.wallet-balance').add(userId, -plan.priceUSDT, 0);

    // 4) 下单
    const order = await strapi.entityService.create('api::subscription-order.subscription-order', {
      data: {
        plan: planId,
        user: userId,
        principalUSDT: plan.priceUSDT,
        startAt: new Date(),
        endAt: dayjs().add(plan.cycleDays, 'day').toDate(),
        orderState: 'active',
      },
    });

    return order;
  },

  async redeemOrder(orderId) {
    const order = await strapi.entityService.findOne('api::subscription-order.subscription-order', orderId, { populate: { plan: true, user: true } });
    if (order.orderState !== 'active') throw new Error('Already redeemed');

    const { plan, principalUSDT, user } = order;
    const staticYield = Number(principalUSDT) * Number(plan.staticYieldPct) / 100;

    // 1) 给本人返本 + 静态收益
    await strapi.service('api::wallet-balance.wallet-balance').add(user.id, staticYield + Number(principalUSDT), 0);

    // 2) 生成邀请返佣
    const inviter = await strapi.db.query('plugin::users-permissions.user').findOne({ where: { id: user.invitedBy } });
    if (inviter) {
      const reward = staticYield * (Number(plan.referralPct) / 100);
      await strapi.service('api::wallet-balance.wallet-balance').add(inviter.id, reward, 0);
      await strapi.entityService.create('api::referral-reward.referral-reward', {
        data: { amountUSDT: reward, referrer: inviter.id, fromUser: user.id, fromOrder: orderId },
      });
    }

    // 3) 更新订单状态
    await strapi.entityService.update('api::subscription-order.subscription-order', orderId, {
      data: { orderState: 'finished' },
    });

    return { staticYield, inviterReward: inviter ? true : false };
  },

  async _checkLimit(userId, plan) {
    // 累计完成的次数
    const finishedCount = await strapi.db.query('api::subscription-order.subscription-order')
      .count({ where: { user: userId, plan: plan.id, orderState: 'finished' } });

    const activeCount = await strapi.db.query('api::subscription-order.subscription-order')
      .count({ where: { user: userId, plan: plan.id, orderState: 'active' } });

    if (finishedCount + activeCount >= plan.maxPurchaseCnt) {
      throw new Error('Purchase limit reached');
    }

    // 解锁检查
    if (plan.unlockAfterCnt) {
      const prevPlan = await strapi.db.query('api::subscription-plan.subscription-plan')
        .findOne({ where: { unlockAfterCnt: plan.unlockAfterCnt - 1 } });

      const prevFinished = await strapi.db.query('api::subscription-order.subscription-order')
        .count({ where: { user: userId, plan: prevPlan.id, orderState: 'finished' } });

      if (prevFinished < plan.unlockAfterCnt) throw new Error('Not unlocked yet');
    }
  },
}); 