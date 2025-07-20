'use strict';

const Strapi = require('@strapi/strapi');

async function resetDatabase() {
  try {
    console.log('🚀 Starting Strapi...');
    const strapi = await Strapi().load();
    
    console.log('🗑️  Clearing database...');
    
    // 清空所有表
    const tables = [
      'up_users_permissions',
      'up_users_roles',
      'up_users',
      'subscription_plans',
      'subscription_orders',
      'wallet_balances',
      'referral_rewards'
    ];
    
    for (const table of tables) {
      try {
        await strapi.connections.default(table).del();
        console.log(`✅ Cleared table: ${table}`);
      } catch (error) {
        console.log(`⚠️  Table ${table} not found or already empty`);
      }
    }
    
    console.log('🌱 Running seed data...');
    
    // 运行订阅计划种子数据
    const subscriptionPlansSeed = require('../database/seeds/001_subscription_plans');
    await subscriptionPlansSeed();
    console.log('✅ Subscription plans seeded');
    
    // 运行角色种子数据
    const rolesSeed = require('../database/seeds/002_default_roles');
    await rolesSeed.up(strapi.connections.default);
    console.log('✅ Default roles seeded');
    
    // 运行管理员用户种子数据
    const adminUserSeed = require('../database/seeds/003_admin_user');
    await adminUserSeed.up(strapi.connections.default);
    console.log('✅ Admin user seeded');
    
    console.log('🎉 Database reset and seeded successfully!');
    console.log('📧 Admin email: admin@zenithus.com');
    console.log('🔑 Admin password: admin123');
    
    // 关闭Strapi
    await strapi.destroy();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    process.exit(1);
  }
}

resetDatabase(); 