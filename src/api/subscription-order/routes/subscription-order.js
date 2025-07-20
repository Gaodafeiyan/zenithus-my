module.exports = {
  routes: [
    { method: 'POST', path: '/subscription-orders/create', handler: 'subscription-order.create', config: { auth: { scope: ['authenticated'] } } },
    { method: 'POST', path: '/subscription-orders/:id/redeem', handler: 'subscription-order.redeem', config: { auth: { scope: ['authenticated'] } } },
  ],
}; 