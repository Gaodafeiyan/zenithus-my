'use strict';

module.exports = () => ({
  async inviteRegister(ctx) {
    const { username, email, password, inviteCode } = ctx.request.body;

    if (!inviteCode) return ctx.badRequest('inviteCode is required');

    // 查找邀请人
    const inviter = await strapi.db.query('plugin::users-permissions.user')
      .findOne({ where: { referralCode: { $eq: inviteCode } } });

    if (!inviter) return ctx.badRequest('Invalid inviteCode');

    // 复用 core service 创建用户
    const newUser = await strapi
      .plugin('users-permissions')
      .service('user')
      .add({
        username,
        email,
        password,
        invitedBy: inviter.id,
      });

    // 生成 JWT
    const jwt = strapi.plugin('users-permissions').service('jwt').issue({ id: newUser.id });

    ctx.send({ jwt, user: newUser });
  },
}); 