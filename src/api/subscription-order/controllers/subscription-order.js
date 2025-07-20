const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreController('api::subscription-order.subscription-order', ({ strapi }) => ({
  
  /** POST /api/subscription-orders/create */
  async create(ctx) {
    const { planId } = ctx.request.body;
    const userId = ctx.state.user.id;
    
    try {
      const order = await strapi.service('api::subscription-order.subscription-order').createWithChecks(userId, planId);
      return ctx.send(order);
    } catch (error) {
      return ctx.badRequest(error.message);
    }
  },

  /** POST /api/subscription-orders/:id/redeem */
  async redeem(ctx) {
    const { id } = ctx.params;
    
    try {
      const order = await strapi.service('api::subscription-order.subscription-order').redeem(id);
      return ctx.send(order);
    } catch (error) {
      return ctx.badRequest(error.message);
    }
  },

})); 