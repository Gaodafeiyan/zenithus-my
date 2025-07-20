export default {
  routes: [
    { method: 'POST', path: '/wallet/auth/invite-register', handler: 'auth.inviteRegister', config: { auth: false } },
  ],
}; 