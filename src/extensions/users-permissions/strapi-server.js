'use strict';

module.exports = (plugin) => {
  const { find, count } = plugin.controllers.role;

  // 安全地处理查询过滤器
  const safeFilters = (ctx) => {
    if (ctx.query?.filters) {
      // 移除可能导致问题的查询条件
      const problematicFields = ['level', 'id', 'type'];
      problematicFields.forEach(field => {
        if (ctx.query.filters[field]) {
          delete ctx.query.filters[field];
        }
      });
      
      // 确保所有查询使用正确的操作符
      const sanitizeFilters = (filters) => {
        for (const key in filters) {
          if (typeof filters[key] === 'object' && filters[key] !== null) {
            // 检查是否使用了错误的操作符
            const validOperators = ['$eq', '$ne', '$in', '$notIn', '$lt', '$lte', '$gt', '$gte', '$null', '$notNull', '$contains', '$notContains', '$startsWith', '$endsWith', '$or', '$and'];
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

  // 安全地处理查询参数
  const safeQuery = (ctx) => {
    // 移除可能导致问题的查询参数
    if (ctx.query?.sort) {
      const validSortFields = ['name', 'description', 'type', 'created_at', 'updated_at'];
      if (typeof ctx.query.sort === 'string') {
        const [field] = ctx.query.sort.split(':');
        if (!validSortFields.includes(field)) {
          delete ctx.query.sort;
        }
      }
    }
    
    // 确保分页参数有效
    if (ctx.query?.pagination) {
      if (ctx.query.pagination.page && (isNaN(ctx.query.pagination.page) || ctx.query.pagination.page < 1)) {
        ctx.query.pagination.page = 1;
      }
      if (ctx.query.pagination.pageSize && (isNaN(ctx.query.pagination.pageSize) || ctx.query.pagination.pageSize < 1)) {
        ctx.query.pagination.pageSize = 25;
      }
    }
  };

  plugin.controllers.role.find = async (ctx) => {
    try {
      safeFilters(ctx);
      safeQuery(ctx);
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
      safeQuery(ctx);
      return await count(ctx);
    } catch (error) {
      console.error('Role count error:', error);
      // 返回0而不是抛出错误
      return { count: 0 };
    }
  };

  return plugin;
}; 