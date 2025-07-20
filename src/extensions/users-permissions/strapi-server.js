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
      
      // 移除 id 相关的错误查询
      if (ctx.query.filters.id) {
        delete ctx.query.filters.id;
      }
      
      // 确保所有查询使用正确的操作符
      const sanitizeFilters = (filters) => {
        for (const key in filters) {
          if (typeof filters[key] === 'object' && filters[key] !== null) {
            // 检查是否使用了错误的操作符
            const validOperators = ['$eq', '$ne', '$in', '$notIn', '$lt', '$lte', '$gt', '$gte', '$null', '$notNull', '$contains', '$notContains', '$startsWith', '$endsWith'];
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
    try {
      safeFilters(ctx);
      return await find(ctx);
    } catch (error) {
      console.error('Role find error:', error);
      // 返回空结果而不是抛出错误
      return { data: [], meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } } };
    }
  };

  plugin.controllers.role.count = async (ctx) => {
    try {
      safeFilters(ctx);
      return await count(ctx);
    } catch (error) {
      console.error('Role count error:', error);
      // 返回0而不是抛出错误
      return { count: 0 };
    }
  };

  return plugin;
}; 