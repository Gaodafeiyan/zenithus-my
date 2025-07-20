'use strict';

module.exports = {
  async up(knex) {
    // 创建订阅计划表
    await knex.schema.createTable('subscription_plans', (table) => {
      table.increments('id').primary();
      table.string('name').unique().notNullable();
      table.decimal('price_usdt', 10, 2).notNullable();
      table.integer('cycle_days').notNullable();
      table.decimal('static_yield_pct', 5, 2).notNullable();
      table.decimal('ai_token_bonus_pct', 5, 2).notNullable();
      table.integer('max_purchase_cnt').notNullable();
      table.integer('unlock_after_cnt');
      table.decimal('referral_pct', 5, 2).notNullable();
      table.integer('lottery_spin_quota').defaultTo(3);
      table.boolean('enabled').defaultTo(true);
      table.timestamps();
    });

    // 创建钱包余额表
    await knex.schema.createTable('wallet_balances', (table) => {
      table.increments('id').primary();
      table.decimal('usdt_balance', 15, 4).defaultTo(0);
      table.decimal('ai_token_balance', 15, 4).defaultTo(0);
      table.integer('user_id').unsigned().references('id').inTable('up_users').onDelete('CASCADE');
      table.timestamps();
    });

    // 创建订阅订单表
    await knex.schema.createTable('subscription_orders', (table) => {
      table.increments('id').primary();
      table.decimal('principal_usdt', 15, 4).notNullable();
      table.enum('order_state', ['active', 'finished']).defaultTo('active');
      table.datetime('start_at').notNullable();
      table.datetime('end_at').notNullable();
      table.decimal('static_yield_usdt', 15, 4).defaultTo(0);
      table.decimal('ai_token_qty', 15, 4).defaultTo(0);
      table.integer('user_id').unsigned().references('id').inTable('up_users').onDelete('CASCADE');
      table.integer('plan_id').unsigned().references('id').inTable('subscription_plans').onDelete('CASCADE');
      table.timestamps();
    });

    // 创建邀请返佣表
    await knex.schema.createTable('referral_rewards', (table) => {
      table.increments('id').primary();
      table.decimal('amount_usdt', 15, 4).notNullable();
      table.integer('referrer_id').unsigned().references('id').inTable('up_users').onDelete('CASCADE');
      table.integer('from_user_id').unsigned().references('id').inTable('up_users').onDelete('CASCADE');
      table.integer('from_order_id').unsigned().references('id').inTable('subscription_orders').onDelete('CASCADE');
      table.timestamps();
    });

    // 添加用户表扩展字段
    await knex.schema.alterTable('up_users', (table) => {
      table.string('diamond_id').unique();
      table.string('referral_code').unique();
      table.integer('invited_by_id').unsigned().references('id').inTable('up_users').onDelete('SET NULL');
    });
  },

  async down(knex) {
    await knex.schema.dropTableIfExists('referral_rewards');
    await knex.schema.dropTableIfExists('subscription_orders');
    await knex.schema.dropTableIfExists('wallet_balances');
    await knex.schema.dropTableIfExists('subscription_plans');
    
    await knex.schema.alterTable('up_users', (table) => {
      table.dropColumn('diamond_id');
      table.dropColumn('referral_code');
      table.dropColumn('invited_by_id');
    });
  }
}; 