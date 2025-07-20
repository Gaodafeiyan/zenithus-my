'use strict';

module.exports = {
  routes: [
    {
      method : 'POST',
      path   : '/wallet/auth/invite-register',
      handler: 'auth.inviteRegister',
      config : { auth: false },          // 公开注册端点
    },
  ],
}; 