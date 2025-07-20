'use strict';

module.exports = {
  info: { singularName: 'subscription-order', pluralName: 'subscription-orders', displayName: 'Subscription Order' },
  options: { draftAndPublish: false },
  attributes: {
    principalUSDT: { type: 'decimal', required: true, scale: 2 },
    orderState: { type: 'enumeration', enum: ['active', 'finished'], default: 'active' },
    startAt: { type: 'datetime', required: true },
    endAt: { type: 'datetime', required: true },
    staticYieldUSDT: { type: 'decimal', default: 0, scale: 2 },
    aiTokenQty: { type: 'decimal', default: 0, scale: 2 },
    plan: { type: 'relation', relation: 'manyToOne', target: 'api::subscription-plan.subscription-plan', inversedBy: 'subscription_orders' },
    user: { type: 'relation', relation: 'manyToOne', target: 'plugin::users-permissions.user', inversedBy: 'subscriptionOrders' },
    referralReward: { type: 'relation', relation: 'oneToOne', target: 'api::referral-reward.referral-reward', inversedBy: 'fromOrder' },
  },
}; 