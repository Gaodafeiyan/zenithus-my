'use strict';

module.exports = {
  info: { singularName: 'subscription-plan', pluralName: 'subscription-plans', displayName: 'Subscription Plan' },
  options: { draftAndPublish: false },
  attributes: {
    name            : { type: 'string', required: true, unique: true },
    priceUSDT       : { type: 'decimal', required: true, scale: 2 },
    cycleDays       : { type: 'integer', required: true },
    staticYieldPct  : { type: 'decimal', required: true, scale: 2 },
    aiTokenBonusPct : { type: 'decimal', required: true, scale: 2 },
    maxPurchaseCnt  : { type: 'integer', required: true },
    unlockAfterCnt  : { type: 'integer' },     // null == 无需解锁
    referralPct     : { type: 'decimal', required: true, scale: 2 }, // 100/90/80/70
    enabled         : { type: 'boolean', default: true },
    subscription_orders: { type: 'relation', relation: 'oneToMany', target: 'api::subscription-order.subscription-order', mappedBy: 'plan' },
  },
}; 