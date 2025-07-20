import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::wallet-balance.wallet-balance', ({ strapi }) => ({
  
  /** GET /api/wallet-balances/my */
  async my(ctx) {
    const userId = ctx.state.user.id;
    
    const wallet = await strapi.db.query('api::wallet-balance.wallet-balance').findOne({ 
      where: { user: userId },
      populate: { user: { select: ['id', 'username', 'diamondId'] } }
    });
    
    if (!wallet) {
      // 自动创建钱包
      const newWallet = await strapi.entityService.create('api::wallet-balance.wallet-balance', { 
        data: { user: userId } 
      });
      return ctx.send(newWallet);
    }
    
    return ctx.send(wallet);
  },

})); 