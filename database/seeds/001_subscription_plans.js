'use strict';

const plans = [
  {
    name: 'PLAN500',
    price_usdt: 500,
    cycle_days: 30,
    static_yield_pct: 6,
    ai_token_bonus_pct: 5,
    max_purchase_cnt: 2,
    unlock_after_cnt: 0,
    referral_pct: 100,
    lottery_spin_quota: 3,
    enabled: true,
  },
  {
    name: 'PLAN1000',
    price_usdt: 1000,
    cycle_days: 30,
    static_yield_pct: 7,
    ai_token_bonus_pct: 6,
    max_purchase_cnt: 3,
    unlock_after_cnt: 2,
    referral_pct: 90,
    lottery_spin_quota: 5,
    enabled: true,
  },
  {
    name: 'PLAN2000',
    price_usdt: 2000,
    cycle_days: 30,
    static_yield_pct: 8,
    ai_token_bonus_pct: 7,
    max_purchase_cnt: 4,
    unlock_after_cnt: 3,
    referral_pct: 80,
    lottery_spin_quota: 8,
    enabled: true,
  },
  {
    name: 'PLAN5000',
    price_usdt: 5000,
    cycle_days: 30,
    static_yield_pct: 10,
    ai_token_bonus_pct: 8,
    max_purchase_cnt: 5,
    unlock_after_cnt: 4,
    referral_pct: 70,
    lottery_spin_quota: 12,
    enabled: true,
  },
];

module.exports = {
  async up(knex) {
    await knex('subscription_plans').insert(plans);
  },

  async down(knex) {
    await knex('subscription_plans').whereIn('name', plans.map(p => p.name)).del();
  }
}; 