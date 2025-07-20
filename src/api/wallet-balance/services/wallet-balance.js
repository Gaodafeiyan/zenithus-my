const { factories } = require('@strapi/strapi');
const { Decimal } = require('decimal.js');

module.exports = factories.createCoreService('api::wallet-balance.wallet-balance', ({ strapi }) => ({
  /** +金额 */
  async add(userId, delta, meta = {}) {
    return this._inc(userId, delta, meta, false);
  },
  /** -金额（不足则抛错） */
  async deduct(userId, delta, meta = {}) {
    return this._inc(userId, delta, meta, true);
  },

  /* 内部 */
  async _inc(userId, delta, meta, isDeduct) {
    const bal = await strapi.db.query('api::wallet-balance.wallet-balance').findOne({ where: { user: userId } })
             ?? await strapi.entityService.create('api::wallet-balance.wallet-balance', { data: { user: userId } });

    const next = new Decimal(bal.usdtBalance)[isDeduct ? 'minus' : 'plus'](delta);
    if (next.isNegative()) throw new Error('INSUFFICIENT_BALANCE');

    return await strapi.entityService.update('api::wallet-balance.wallet-balance', bal.id, { data: { usdtBalance: next.toFixed(4) }});
  },
})); 