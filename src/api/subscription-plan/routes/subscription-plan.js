'use strict';

module.exports = {
  routes: [
    { method: 'GET', path: '/subscription-plans', handler: 'subscription-plan.find' },
    { method: 'GET', path: '/subscription-plans/:id', handler: 'subscription-plan.findOne' },
    { method: 'POST', path: '/subscription-plans', handler: 'subscription-plan.create' },
    { method: 'PUT', path: '/subscription-plans/:id', handler: 'subscription-plan.update' },
    { method: 'DELETE', path: '/subscription-plans/:id', handler: 'subscription-plan.delete' },
    { method: 'GET', path: '/subscription-plans/enabled', handler: 'subscription-plan.enabled' },
  ],
}; 