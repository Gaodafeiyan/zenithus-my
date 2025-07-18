'use strict';

module.exports = (plugin) => {
  const { find, count } = plugin.controllers.role;

  // 递归删除对象中的 level 字段
  const deepStripLevel = (obj) => {
    if (typeof obj !== 'object' || obj === null) return;
    if ('level' in obj) delete obj.level;
    for (const key in obj) {
      if (typeof obj[key] === 'object') deepStripLevel(obj[key]);
    }
  };

  const stripLevel = (ctx) => {
    if (ctx.query?.filters) {
      deepStripLevel(ctx.query.filters);
    }
  };

  plugin.controllers.role.find = async (ctx) => {
    stripLevel(ctx);
    return find(ctx);
  };

  plugin.controllers.role.count = async (ctx) => {
    stripLevel(ctx);
    return count(ctx);
  };

  return plugin;
}; 