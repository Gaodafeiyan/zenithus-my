import { factories } from '@strapi/strapi';

export default factories.createCoreController('plugin::users-permissions.user', ({ strapi }) => ({

  /** POST /wallet/auth/invite-register */
  async inviteRegister(ctx) {
    const { username, email, password, inviteCode } = ctx.request.body;
    if (!inviteCode) return ctx.badRequest('INVITE_CODE_REQUIRED');

    // 1. 查找上级
    const inviter = await strapi.db.query('plugin::users-permissions.user').findOne({ where: { referralCode: inviteCode } });
    if (!inviter) return ctx.badRequest('INVALID_CODE');

    // 2. 走官方注册服务
    const userService = strapi.plugin('users-permissions').service('user');
    const result = await userService.add({ username, email, password });

    // 3. 写入 invitedBy 外键
    await strapi.entityService.update('plugin::users-permissions.user', result.user.id, {
      data: { invitedBy: inviter.id },
    });

    // 4. 自动创建钱包
    await strapi.entityService.create('api::wallet-balance.wallet-balance', { data: { user: result.user.id } });

    ctx.body = result;   // { jwt, user }
  },

})); 