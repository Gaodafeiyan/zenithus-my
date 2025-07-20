const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreController('api::subscription-plan.subscription-plan', ({ strapi }) => ({
  
  /** GET /api/subscription-plans/enabled */
  async enabled(ctx) {
    const plans = await strapi.db.query('api::subscription-plan.subscription-plan').findMany({
      where: { enabled: true },
      orderBy: { priceUSDT: 'asc' }
    });
    
    return ctx.send(plans);
  },

})); 