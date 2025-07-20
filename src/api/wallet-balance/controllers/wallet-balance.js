'use strict';

module.exports = () => ({
  async find(ctx) {                       // GET /wallet-balances
    const userId = ctx.state.user.id;
    const res = await strapi.db.query('api::wallet-balance.wallet-balance')
      .findMany({ where: { owner: userId } });
    ctx.send({ success: true, data: res });
  },

  async depositAddress(ctx) {             // GET /wallet-balances/deposit-address
    // 这里直接返回固定地址 + base64 二维码；后期可接入动态地址
    const address = '0x742d35cc6634c0532925a3b8d4c9db96c4b4d8b6';
    ctx.send({
      success: true,
      address,
      network: 'BSC',
      qrcode : `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${address}`,
    });
  },
}); 