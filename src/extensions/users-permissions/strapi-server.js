'use strict';

module.exports = (plugin) => {
  // 完全重写角色控制器
  plugin.controllers.role = {
    async find(ctx) {
      try {
        // 直接使用原始查询
        const roles = await strapi.connections.default('up_users_roles').select('*');
        ctx.send({ data: roles });
      } catch (error) {
        console.error('Role find error:', error);
        ctx.send({ data: [] });
      }
    },

    async count(ctx) {
      try {
        const result = await strapi.connections.default('up_users_roles').count('* as count');
        ctx.send({ count: result[0].count });
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

    async create(ctx) {
      try {
        const role = await strapi.connections.default('up_users_roles')
          .insert(ctx.request.body)
          .returning('*');
        ctx.send({ data: role[0] });
      } catch (error) {
        console.error('Role create error:', error);
        ctx.badRequest('Failed to create role');
      }
    },

    async update(ctx) {
      try {
        const { id } = ctx.params;
        const role = await strapi.connections.default('up_users_roles')
          .where('id', id)
          .update(ctx.request.body)
          .returning('*');
        ctx.send({ data: role[0] });
      } catch (error) {
        console.error('Role update error:', error);
        ctx.badRequest('Failed to update role');
      }
    },

    async delete(ctx) {
      try {
        const { id } = ctx.params;
        await strapi.connections.default('up_users_roles')
          .where('id', id)
          .del();
        ctx.send({ success: true });
      } catch (error) {
        console.error('Role delete error:', error);
        ctx.badRequest('Failed to delete role');
      }
    },
  };

  return plugin;
}; 