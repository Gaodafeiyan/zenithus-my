'use strict';

const bcrypt = require('bcryptjs');

async function initDatabase() {
  try {
    console.log('🚀 Initializing database...');
    
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

    // 插入角色
    for (const role of roles) {
      const existing = await strapi.db.query('plugin::users-permissions.role')
        .findOne({ where: { type: role.type } });
      
      if (!existing) {
        await strapi.db.query('plugin::users-permissions.role').create({
          data: role
        });
        console.log(`✅ Created role: ${role.name}`);
      }
    }

    // 创建管理员用户
    const adminRole = await strapi.db.query('plugin::users-permissions.role')
      .findOne({ where: { type: 'admin' } });

    const existingAdmin = await strapi.db.query('plugin::users-permissions.user')
      .findOne({ where: { username: 'admin' } });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await strapi.db.query('plugin::users-permissions.user').create({
        data: {
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
        }
      });
      console.log('✅ Created admin user');
    }

    // 为管理员角色添加所有权限
    const allPermissions = [
      // 用户权限
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
      // 内容类型权限
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

    // 检查并创建权限
    for (const action of allPermissions) {
      const existing = await strapi.db.query('plugin::users-permissions.permission')
        .findOne({ where: { action, role: adminRole.id } });
      
      if (!existing) {
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action,
            role: adminRole.id,
            created_at: new Date(),
            updated_at: new Date(),
          }
        });
      }
    }

    console.log('🎉 Database initialization completed!');
    console.log('📧 Admin email: admin@zenithus.com');
    console.log('🔑 Admin password: admin123');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  }
}

module.exports = initDatabase; 