'use strict';

module.exports = (plugin) => {
  // ����ԭʼ service
  const { find, count } = plugin.services.role;

  // ȥ����Ч�� level ����
  const sanitize = (params = {}) => {
    if (params.where && params.where.level) {
      delete params.where.level;               // �ؼ���
    }
    return params;
  };

  plugin.services.role.find = (params) => find(sanitize(params));
  plugin.services.role.count = (params) => count(sanitize(params));

  return plugin;
};
