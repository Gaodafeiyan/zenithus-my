import type { Schema } from '@strapi/strapi';

const WalletSchema: Schema = {
  info: { singularName: 'wallet-balance', pluralName: 'wallet-balances', displayName: '钱包余额' },
  options: { draftAndPublish: false },
  attributes: {
    usdtBalance : { type: 'decimal', default: 0 },
    aiTokenBalance: { type: 'decimal', default: 0 },
    user        : { type: 'relation', relation: 'oneToOne', target: 'plugin::users-permissions.user', inversedBy: 'wallet' },
  },
};
export default WalletSchema; 