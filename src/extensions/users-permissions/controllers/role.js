'use strict';

module.exports = () => ({
  async find(ctx) {
    try {
      // 直接使用原始查询绕过ORM问题
      const roles = await strapi.connections.default('up_users_roles').select('*');
      ctx.send({ data: roles });
    } catch (error) {
      console.error('Role find error:', error);
      ctx.send({ data: [] });
    }
  },

  async count(ctx) {
    try {
      const count = await strapi.connections.default('up_users_roles').count('* as count');
      ctx.send({ count: count[0].count });
    } catch (error) {
      console.error('Role count error:', error);
      ctx.send({ count: 0 });
    }
  },

  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      const role = await strapi.connections.default('up_users_roles')
        .where('id', id)
        .first();
      ctx.send({ data: role });
    } catch (error) {
      console.error('Role findOne error:', error);
      ctx.send({ data: null });
    }
  },
}); 