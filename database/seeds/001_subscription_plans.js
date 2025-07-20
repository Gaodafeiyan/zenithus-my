'use strict';

module.exports = async () => {
  const exists = await strapi.db.query('api::subscription-plan.subscription-plan').findMany();
  if (exists.length) return;

  const plans = [
    { name: 'PLAN500', priceUSDT: 500,  cycleDays: 15, staticYieldPct: 6,  aiTokenBonusPct: 3, maxPurchaseCnt: 2, unlockAfterCnt: null, referralPct: 100 },
    { name: 'PLAN1K',  priceUSDT: 1000, cycleDays: 20, staticYieldPct: 7,  aiTokenBonusPct: 4, maxPurchaseCnt: 3, unlockAfterCnt: 2,   referralPct: 90  },
    { name: 'PLAN2K',  priceUSDT: 2000, cycleDays: 25, staticYieldPct: 8,  aiTokenBonusPct: 5, maxPurchaseCnt: 4, unlockAfterCnt: 3,   referralPct: 80  },
    { name: 'PLAN5K',  priceUSDT: 5000, cycleDays: 30, staticYieldPct: 10, aiTokenBonusPct: 6, maxPurchaseCnt: 5, unlockAfterCnt: 4,   referralPct: 70  },
  ];

  for (const p of plans) {
    await strapi.entityService.create('api::subscription-plan.subscription-plan', { data: p });
  }
}; 