module.exports = {
  routes: [
    { method: 'GET', path: '/users/profile', handler: 'user.profile', config: { auth: { scope: ['authenticated'] } } },
    { method: 'GET', path: '/users/invitees', handler: 'user.invitees', config: { auth: { scope: ['authenticated'] } } },
  ],
}; 