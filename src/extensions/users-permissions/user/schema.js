'use strict';

module.exports = {
  info: {
    singularName: 'user',
    pluralName  : 'users',
    displayName : 'user',
    kind        : 'collectionType',
  },
  options: {
    draftAndPublish: false,
  },
  attributes: {
    diamondId    : { type: 'string', unique: true },
    referralCode : { type: 'string', unique: true },
    invitedBy    : { type: 'relation', relation: 'manyToOne', target: 'plugin::users-permissions.user', inversedBy: 'invitees' },
    invitees     : { type: 'relation', relation: 'oneToMany', target: 'plugin::users-permissions.user', mappedBy: 'invitedBy' },
    wallet       : { type: 'relation', relation: 'oneToOne', target: 'api::wallet-balance.wallet-balance', inversedBy: 'owner' },
    subscriptionOrders: { type: 'relation', relation: 'oneToMany', target: 'api::subscription-order.subscription-order', mappedBy: 'user' },
  },
}; 