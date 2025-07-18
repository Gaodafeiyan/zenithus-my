'use strict';

module.exports = (plugin) => {
  // 保留原始 service
  const { find, count } = plugin.services.role;

  // 去掉无效的 level 过滤
  const sanitize = (params = {}) => {
    if (params.where && params.where.level) {
      delete params.where.level;               // 关键行
    }
    return params;
  };

  plugin.services.role.find = (params) => find(sanitize(params));
  plugin.services.role.count = (params) => count(sanitize(params));

  return plugin;
};
