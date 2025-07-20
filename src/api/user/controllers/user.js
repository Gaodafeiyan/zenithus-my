const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreController('plugin::users-permissions.user', ({ strapi }) => ({
  
  /** GET /api/users/profile */
  async profile(ctx) {
    const userId = ctx.state.user.id;
    
    const user = await strapi.entityService.findOne('plugin::users-permissions.user', userId, {
      populate: {
        wallet: true,
        invitedBy: { select: ['id', 'username', 'diamondId'] },
        invitees: { select: ['id', 'username', 'diamondId'] },
        subscriptionOrders: {
          populate: { plan: true }
        }
      }
    });
    
    return ctx.send(user);
  },

  /** GET /api/users/invitees */
  async invitees(ctx) {
    const userId = ctx.state.user.id;
    
    const invitees = await strapi.db.query('plugin::users-permissions.user').findMany({
      where: { invitedBy: userId },
      select: ['id', 'username', 'diamondId', 'createdAt'],
      populate: {
        subscriptionOrders: {
          where: { orderState: 'finished' },
          populate: { plan: true }
        }
      }
    });
    
    return ctx.send(invitees);
  },

})); 