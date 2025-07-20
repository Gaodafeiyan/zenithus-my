'use strict';

module.exports = {
  routes: [
    { method: 'GET', path: '/wallet-balances',           handler: 'wallet-balance.find' },
    { method: 'GET', path: '/wallet-balances/deposit-address', handler: 'wallet-balance.depositAddress' },
  ],
}; 