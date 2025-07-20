'use strict';

module.exports = () => ({
  async create(ctx) {
    const { planId } = ctx.request.body;
    const order = await strapi.service('api::subscription-order.subscription-order').createOrder(ctx.state.user.id, planId);
    ctx.send(order);
  },

  async redeem(ctx) {
    const { id } = ctx.params;
    const res = await strapi.service('api::subscription-order.subscription-order').redeemOrder(id);
    ctx.send(res);
  },
}); 