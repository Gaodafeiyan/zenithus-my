const OrderSchema = {
  info: { singularName: 'subscription-order', pluralName: 'subscription-orders', displayName: '认购订单' },
  options: { draftAndPublish: false },
  attributes: {
    principalUSDT : { type: 'decimal', required: true },
    orderState    : { type: 'enumeration', enum: ['active','finished'], default: 'active' },
    startAt       : { type: 'datetime', required: true },
    endAt         : { type: 'datetime', required: true },
    staticYieldUSDT: { type: 'decimal', default: 0 },
    aiTokenQty    : { type: 'decimal', default: 0 },
    // 关系
    user          : { type: 'relation', relation: 'manyToOne', target: 'plugin::users-permissions.user', inversedBy: 'subscriptionOrders' },
    plan          : { type: 'relation', relation: 'manyToOne', target: 'api::subscription-plan.subscription-plan', inversedBy: 'orders' },
    referralReward: { type: 'relation', relation: 'oneToOne',  target: 'api::referral-reward.referral-reward' },
  },
};
module.exports = OrderSchema; 