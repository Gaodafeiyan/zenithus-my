'use strict';

const { customAlphabet } = require('nanoid');
const nanoDiamond   = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ123456789', 9);
const nanoReferral  = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8);

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    // 只在后台或普通注册场景自动生成
    if (!data.diamondId)    data.diamondId    = nanoDiamond();
    if (!data.referralCode) data.referralCode = nanoReferral();
  },
}; 