'use strict';

module.exports = {
  async up(knex) {
    // 创建管理员角色
    const adminRole = await knex('up_users_roles').insert({
      name: 'Administrator',
      description: 'Super admin role',
      type: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    }).returning('*');

    // 创建管理员用户
    const adminUser = await knex('up_users').insert({
      username: 'admin',
      email: 'admin@zenithus.com',
      password: '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', // password: admin123
      confirmed: true,
      blocked: false,
      role: adminRole[0].id,
      diamondId: 'ADMIN001',
      referralCode: 'ADMINREF',
      created_at: new Date(),
      updated_at: new Date(),
    }).returning('*');

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

    const adminPermissions = allPermissions.map(action => ({
      action,
      role: adminRole[0].id,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await knex('up_users_permissions').insert(adminPermissions);

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@zenithus.com');
    console.log('🔑 Password: admin123');
  },

  async down(knex) {
    // 删除管理员用户
    await knex('up_users').where('username', 'admin').del();
    
    // 删除管理员角色
    await knex('up_users_roles').where('type', 'admin').del();
  },
}; 