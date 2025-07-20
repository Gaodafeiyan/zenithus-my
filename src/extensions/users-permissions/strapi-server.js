'use strict';

module.exports = (plugin) => {
  const { find, count } = plugin.controllers.role;

  // 安全地处理查询过滤器
  const safeFilters = (ctx) => {
    if (ctx.query?.filters) {
      // 移除可能导致问题的 level 相关查询
      if (ctx.query.filters.level) {
        delete ctx.query.filters.level;
      }
      
      // 确保所有查询使用正确的操作符
      const sanitizeFilters = (filters) => {
        for (const key in filters) {
          if (typeof filters[key] === 'object' && filters[key] !== null) {
            // 检查是否使用了错误的操作符
            const validOperators = ['$eq', '$ne', '$in', '$notIn', '$lt', '$lte', '$gt', '$gte', '$null', '$notNull'];
            const hasInvalidOperator = Object.keys(filters[key]).some(k => !validOperators.includes(k) && !k.startsWith('$'));
            
            if (hasInvalidOperator) {
              // 如果发现无效操作符，删除这个过滤器
              delete filters[key];
            } else {
              sanitizeFilters(filters[key]);
            }
          }
        }
      };
      
      sanitizeFilters(ctx.query.filters);
    }
  };

  plugin.controllers.role.find = async (ctx) => {
    safeFilters(ctx);
    return find(ctx);
  };

  plugin.controllers.role.count = async (ctx) => {
    safeFilters(ctx);
    return count(ctx);
  };

  return plugin;
}; 