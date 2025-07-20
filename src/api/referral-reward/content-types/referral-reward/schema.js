'use strict';

module.exports = {
  info: { singularName: 'referral-reward', pluralName: 'referral-rewards', displayName: 'Referral Reward' },
  options: { draftAndPublish: false },
  attributes: {
    amountUSDT: { type: 'decimal', required: true, scale: 2 },
    referrer: { type: 'relation', relation: 'manyToOne', target: 'plugin::users-permissions.user' },
    fromUser: { type: 'relation', relation: 'manyToOne', target: 'plugin::users-permissions.user' },
    fromOrder: { type: 'relation', relation: 'manyToOne', target: 'api::subscription-order.subscription-order' },
  },
}; 