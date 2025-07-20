'use strict';

module.exports = {
  info: { singularName: 'wallet-balance', pluralName: 'wallet-balances', displayName: 'Wallet Balance' },
  options: { draftAndPublish: false },
  attributes: {
    usdtBalance  : { type: 'decimal', default: 0, scale: 8 },
    aiTokenBalance: { type: 'decimal', default: 0, scale: 8 },
    owner: { type: 'relation', relation: 'oneToOne', target: 'plugin::users-permissions.user', inversedBy: 'wallet' },
  },
}; 