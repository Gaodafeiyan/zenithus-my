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
    invitedBy    : { type: 'relation', relation: 'manyToOne', target: 'plugin::users-permissions.user' },
    invitees     : { type: 'relation', relation: 'oneToMany', target: 'plugin::users-permissions.user', mappedBy: 'invitedBy' },
  },
}; 