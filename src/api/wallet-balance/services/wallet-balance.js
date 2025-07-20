'use strict';

module.exports = () => ({
  async add(userId, deltaUSDT = 0, deltaAI = 0) {
    const existing = await strapi.db.query('api::wallet-balance.wallet-balance')
      .findOne({ where: { owner: userId } });

    if (!existing) {
      return await strapi.entityService.create('api::wallet-balance.wallet-balance', {
        data: { usdtBalance: deltaUSDT, aiTokenBalance: deltaAI, owner: userId },
      });
    }

    return await strapi.entityService.update('api::wallet-balance.wallet-balance', existing.id, {
      data: {
        usdtBalance: Number(existing.usdtBalance) + Number(deltaUSDT),
        aiTokenBalance: Number(existing.aiTokenBalance) + Number(deltaAI),
      },
    });
  },
}); 