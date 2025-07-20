'use strict';

module.exports = {
  async up(knex) {
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
    ];

    // 插入角色
    await knex('up_users_roles').insert(roles);

    // 获取角色ID
    const authenticatedRole = await knex('up_users_roles')
      .where('type', 'authenticated')
      .first();
    
    const publicRole = await knex('up_users_roles')
      .where('type', 'public')
      .first();

    // 创建权限
    const permissions = [
      // 用户相关权限
      {
        action: 'plugin::users-permissions.auth.callback',
        role: authenticatedRole.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'plugin::users-permissions.auth.connect',
        role: authenticatedRole.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'plugin::users-permissions.auth.emailconfirmation',
        role: authenticatedRole.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'plugin::users-permissions.auth.forgotpassword',
        role: authenticatedRole.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'plugin::users-permissions.auth.resetpassword',
        role: authenticatedRole.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'plugin::users-permissions.auth.sendemailconfirmation',
        role: authenticatedRole.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'plugin::users-permissions.user.me',
        role: authenticatedRole.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'plugin::users-permissions.user.update',
        role: authenticatedRole.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'plugin::users-permissions.user.update',
        role: publicRole.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'plugin::users-permissions.user.create',
        role: publicRole.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'plugin::users-permissions.auth.callback',
        role: publicRole.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'plugin::users-permissions.auth.connect',
        role: publicRole.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'plugin::users-permissions.auth.emailconfirmation',
        role: publicRole.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'plugin::users-permissions.auth.forgotpassword',
        role: publicRole.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'plugin::users-permissions.auth.resetpassword',
        role: publicRole.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'plugin::users-permissions.auth.sendemailconfirmation',
        role: publicRole.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'plugin::users-permissions.user.me',
        role: publicRole.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // 插入权限
    await knex('up_users_permissions').insert(permissions);
  },

  async down(knex) {
    // 删除权限
    await knex('up_users_permissions').del();
    
    // 删除角色
    await knex('up_users_roles').del();
  },
}; 