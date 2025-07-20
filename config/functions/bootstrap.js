'use strict';
 
module.exports = async ({ strapi }) => {
  try {
    console.log('🌱 Starting seed data initialization...');
    
    // 运行订阅计划种子数据
    const subscriptionPlansSeed = require('../../database/seeds/001_subscription_plans');
    await subscriptionPlansSeed();
    console.log('✅ Subscription plans seeded');
    
    // 运行角色种子数据
    const rolesSeed = require('../../database/seeds/002_default_roles');
    await rolesSeed.up(strapi.connections.default);
    console.log('✅ Default roles seeded');
    
    // 运行管理员用户种子数据
    const adminUserSeed = require('../../database/seeds/003_admin_user');
    await adminUserSeed.up(strapi.connections.default);
    console.log('✅ Admin user seeded');
    
    console.log('🎉 All seed data loaded successfully!');
  } catch (error) {
    console.error('❌ Error loading seed data:', error.message);
    console.error('Stack trace:', error.stack);
  }
}; 