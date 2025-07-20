import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::subscription-plan.subscription-plan', ({ strapi }) => ({
  
  /** GET /api/subscription-plans/enabled */
  async enabled(ctx) {
    const plans = await strapi.db.query('api::subscription-plan.subscription-plan').findMany({
      where: { enabled: true },
      orderBy: { priceUSDT: 'asc' }
    });
    
    return ctx.send(plans);
  },

})); 