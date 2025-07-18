'use strict';
const { factories } = require('@strapi/strapi');

/**
 * Override Role controller
 * ‑‑ 去掉无效的 level 过滤，避免 500
 */
module.exports = factories.createCoreController(
  'plugin::users-permissions.role',
  ({ strapi }) => ({
    async find(ctx) {
      // 原本的 query 但不加 level 过滤
      const { results, pagination } = await strapi
        .service('plugin::users-permissions.role')
        .find(ctx.query);

      return this.transformResponse(results, { pagination });
    },
  }),
); 