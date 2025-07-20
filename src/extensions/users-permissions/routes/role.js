'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/users-permissions/roles',
      handler: 'role.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/users-permissions/roles/:id',
      handler: 'role.findOne',
      config: {
        auth: false,
      },
    },
  ],
}; 