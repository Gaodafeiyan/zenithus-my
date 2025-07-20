'use strict';

const bcrypt = require('bcryptjs');

async function resetDatabase() {
  try {
    console.log('🗑️  Resetting database...');
    
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
    
    console.log('🌱 Creating default roles...');
    
    // 创建默认角色
    const roles = [
      {
        name: 'Authenticated',
        description: 'Default role given to authenticated user.',
        type: 'authenticated',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Public', 
        description: 'Default role given to unauthenticated user.',
        type: 'public',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Administrator',
        description: 'Super admin role',
        type: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    
    for (const role of roles) {
      await strapi.connections.default('up_users_roles').insert(role);
      console.log(`✅ Created role: ${role.name}`);
    }
    
    console.log('👤 Creating admin user...');
    
    // 创建管理员用户
    const adminRole = await strapi.connections.default('up_users_roles')
      .where('type', 'admin')
      .first();
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await strapi.connections.default('up_users').insert({
      username: 'admin',
      email: 'admin@zenithus.com',
      password: hashedPassword,
      confirmed: true,
      blocked: false,
      role: adminRole.id,
      diamondId: 'ADMIN001',
      referralCode: 'ADMINREF',
      created_at: new Date(),
      updated_at: new Date(),
    });
    
    console.log('🔑 Creating permissions...');
    
    // 为管理员角色添加所有权限
    const allPermissions = [
      'plugin::users-permissions.auth.callback',
      'plugin::users-permissions.auth.connect',
      'plugin::users-permissions.auth.emailconfirmation',
      'plugin::users-permissions.auth.forgotpassword',
      'plugin::users-permissions.auth.resetpassword',
      'plugin::users-permissions.auth.sendemailconfirmation',
      'plugin::users-permissions.user.me',
      'plugin::users-permissions.user.update',
      'plugin::users-permissions.user.create',
      'plugin::users-permissions.user.find',
      'plugin::users-permissions.user.findOne',
      'plugin::users-permissions.user.delete',
      'plugin::users-permissions.role.find',
      'plugin::users-permissions.role.findOne',
      'plugin::users-permissions.role.create',
      'plugin::users-permissions.role.update',
      'plugin::users-permissions.role.delete',
      'api::subscription-plan.subscription-plan.find',
      'api::subscription-plan.subscription-plan.findOne',
      'api::subscription-plan.subscription-plan.create',
      'api::subscription-plan.subscription-plan.update',
      'api::subscription-plan.subscription-plan.delete',
      'api::subscription-order.subscription-order.find',
      'api::subscription-order.subscription-order.findOne',
      'api::subscription-order.subscription-order.create',
      'api::subscription-order.subscription-order.update',
      'api::subscription-order.subscription-order.delete',
      'api::wallet-balance.wallet-balance.find',
      'api::wallet-balance.wallet-balance.findOne',
      'api::wallet-balance.wallet-balance.create',
      'api::wallet-balance.wallet-balance.update',
      'api::wallet-balance.wallet-balance.delete',
      'api::referral-reward.referral-reward.find',
      'api::referral-reward.referral-reward.findOne',
      'api::referral-reward.referral-reward.create',
      'api::referral-reward.referral-reward.update',
      'api::referral-reward.referral-reward.delete',
    ];
    
    for (const action of allPermissions) {
      await strapi.connections.default('up_users_permissions').insert({
        action,
        role: adminRole.id,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    
    console.log('📋 Creating subscription plans...');
    
    // 创建订阅计划
    const plans = [
      { name: 'PLAN500', priceUSDT: 500,  cycleDays: 15, staticYieldPct: 6,  aiTokenBonusPct: 3, maxPurchaseCnt: 2, unlockAfterCnt: null, referralPct: 100, enabled: true, created_at: new Date(), updated_at: new Date() },
      { name: 'PLAN1K',  priceUSDT: 1000, cycleDays: 20, staticYieldPct: 7,  aiTokenBonusPct: 4, maxPurchaseCnt: 3, unlockAfterCnt: 2,   referralPct: 90,  enabled: true, created_at: new Date(), updated_at: new Date() },
      { name: 'PLAN2K',  priceUSDT: 2000, cycleDays: 25, staticYieldPct: 8,  aiTokenBonusPct: 5, maxPurchaseCnt: 4, unlockAfterCnt: 3,   referralPct: 80,  enabled: true, created_at: new Date(), updated_at: new Date() },
      { name: 'PLAN5K',  priceUSDT: 5000, cycleDays: 30, staticYieldPct: 10, aiTokenBonusPct: 6, maxPurchaseCnt: 5, unlockAfterCnt: 4,   referralPct: 70,  enabled: true, created_at: new Date(), updated_at: new Date() },
    ];
    
    for (const plan of plans) {
      await strapi.connections.default('subscription_plans').insert(plan);
    }
    
    console.log('🎉 Database reset completed!');
    console.log('📧 Admin email: admin@zenithus.com');
    console.log('🔑 Admin password: admin123');
    
  } catch (error) {
    console.error('❌ Error resetting database:', error);
  }
}

module.exports = resetDatabase; 