module.exports = {
  routes: [
    { method: 'GET', path: '/subscription-plans/enabled', handler: 'subscription-plan.enabled', config: { auth: false } },
  ],
}; 