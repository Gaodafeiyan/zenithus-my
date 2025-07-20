'use strict';

module.exports = {
  info: { singularName: 'subscription-order', pluralName: 'subscription-orders', displayName: 'Subscription Order' },
  options: { draftAndPublish: false },
  attributes: {
    plan: { type: 'relation', relation: 'manyToOne', target: 'api::subscription-plan.subscription-plan', inversedBy: 'subscription_orders' },
    user: { type: 'relation', relation: 'manyToOne', target: 'plugin::users-permissions.user', inversedBy: 'subscription_orders' },
    principalUSDT: { type: 'decimal', required: true, scale: 2 },
    startAt: { type: 'datetime', required: true },
    endAt: { type: 'datetime', required: true },
    orderState: { type: 'enumeration', enum: ['active', 'finished', 'cancelled'], default: 'active' },
    staticYield: { type: 'decimal', scale: 2 },
    aiTokenBonus: { type: 'decimal', scale: 2 },
  },
}; 