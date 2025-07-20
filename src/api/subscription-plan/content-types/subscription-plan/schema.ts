import type { Schema } from '@strapi/strapi';

const PlanSchema: Schema = {
  info: { singularName: 'subscription-plan', pluralName: 'subscription-plans', displayName: '订阅档位' },
  options: { draftAndPublish: false },
  attributes: {
    name            : { type: 'string', unique: true, required: true },    // PLAN500 …
    priceUSDT       : { type: 'decimal',   required: true,  configurable: false },
    cycleDays       : { type: 'integer',   required: true },
    staticYieldPct  : { type: 'decimal',   required: true },               // 6,7,8,10
    aiTokenBonusPct : { type: 'decimal',   required: true },
    maxPurchaseCnt  : { type: 'integer',   required: true },               // 2 / 3 / 4 / 5
    unlockAfterCnt  : { type: 'integer' },                                 // 0 / 2 / 3 / 4
    referralPct     : { type: 'decimal',   required: true },               // 100 / 90 / 80 / 70
    lotterySpinQuota: { type: 'integer',   default: 3 },
    enabled         : { type: 'boolean',   default: true },
    orders          : { type: 'relation', relation: 'oneToMany', target: 'api::subscription-order.subscription-order', mappedBy: 'plan' },
  },
};
export default PlanSchema; 