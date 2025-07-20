'use strict';
module.exports = {
  routes: [
    { method: 'POST', path: '/subscription-orders', handler: 'subscription-order.create' },
    { method: 'POST', path: '/subscription-orders/:id/redeem', handler: 'subscription-order.redeem' },
  ],
}; 