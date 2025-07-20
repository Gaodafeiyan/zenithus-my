const { customAlphabet } = require('nanoid');

const nanoid9 = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789', 9);

const UserLifecycles = {
  async beforeCreate(event) {
    const { data } = event.params;
    data.diamondId    = nanoid9();      // 9 位钻石 ID
    data.referralCode = nanoid9();      // 作为邀请码
  },
};
module.exports = UserLifecycles; 