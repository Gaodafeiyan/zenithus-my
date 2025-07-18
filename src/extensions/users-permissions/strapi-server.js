'use strict';

module.exports = (plugin) => {
  // --- 把原控制器暂存起来 -----------------
  const { find, count } = plugin.controllers.role;

  // --- 过滤器：把 filters.level 整块扔掉 ---
  const stripLevel = (ctx) => {
    if (ctx.query?.filters?.level) delete ctx.query.filters.level;
  };

  // --- 重写 find / count -------------------
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
