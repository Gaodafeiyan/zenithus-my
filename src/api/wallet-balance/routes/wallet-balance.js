module.exports = {
  routes: [
    { method: 'GET', path: '/wallet-balances/my', handler: 'wallet-balance.my', config: { auth: { scope: ['authenticated'] } } },
  ],
}; 