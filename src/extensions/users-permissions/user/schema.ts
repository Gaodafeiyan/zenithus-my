import type { Schema } from '@strapi/strapi';

const UserSchema: Schema = {
  info: {
    singularName: 'user',
    pluralName  : 'users',
    displayName : 'User',
    description : '扩展字段：钻石 ID / 邀请码 / 上级关系',
  },
  options: { draftAndPublish: false },
  attributes: {
    // 原生字段：username / email / password …
    // ➊ 业务字段
    diamondId:   { type: 'string',  unique: true, configurable: false },
    referralCode:{ type: 'string',  unique: true, configurable: false },
    // ➋ 上下级关系
    invitedBy:   { type: 'relation', relation: 'manyToOne', target: 'plugin::users-permissions.user', inversedBy: 'invitees' },
    invitees:    { type: 'relation', relation: 'oneToMany', target: 'plugin::users-permissions.user', mappedBy:  'invitedBy' },
    // ➌ 钱包一对一
    wallet:      { type: 'relation', relation: 'oneToOne',  target: 'api::wallet-balance.wallet-balance' },
    // ➍ 认购订单
    subscriptionOrders: { type: 'relation', relation: 'oneToMany', target: 'api::subscription-order.subscription-order', mappedBy: 'user' },
  },
};
export default UserSchema; 