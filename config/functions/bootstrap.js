'use strict';
 
module.exports = async ({ strapi }) => {
  const knex = strapi.connections.default;
  
  try {
    // 运行订阅计划种子数据
    const subscriptionPlansSeed = require('../../database/seeds/001_subscription_plans');
    if (typeof subscriptionPlansSeed === 'function') {
      await subscriptionPlansSeed();
    } else if (subscriptionPlansSeed.up) {
      await subscriptionPlansSeed.up(knex);
    }
    
    // 运行角色种子数据
    const rolesSeed = require('../../database/seeds/002_default_roles');
    if (rolesSeed.up) {
      await rolesSeed.up(knex);
    }
    
    // 运行管理员用户种子数据
    const adminUserSeed = require('../../database/seeds/003_admin_user');
    if (adminUserSeed.up) {
      await adminUserSeed.up(knex);
    }
    
    console.log('✅ All seed data loaded successfully!');
  } catch (error) {
    console.error('❌ Error loading seed data:', error);
  }
}; 