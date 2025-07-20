import type { Schema } from '@strapi/strapi';

const RewardSchema: Schema = {
  info: { singularName: 'referral-reward', pluralName: 'referral-rewards', displayName: '邀请返佣' },
  options: { draftAndPublish: false },
  attributes: {
    amountUSDT:  { type: 'decimal', required: true },
    referrer:    { type: 'relation', relation: 'manyToOne', target: 'plugin::users-permissions.user' },
    fromUser:    { type: 'relation', relation: 'manyToOne', target: 'plugin::users-permissions.user' },
    fromOrder:   { type: 'relation', relation: 'oneToOne',  target: 'api::subscription-order.subscription-order', inversedBy: 'referralReward' },
  },
};
export default RewardSchema; 