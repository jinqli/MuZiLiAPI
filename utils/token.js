const jwt = require("jsonwebtoken");
const Token = {
  // data加密数据，time过期时间
  encrypt: function (data, time) {
    return jwt.sign(data, "token", { expiresIn: time });
  },
  decrypt: function (token) {
    try {
      let data = jwt.verify(token, "token");
      return {
        token: true,
        id: data.id,
      };
    } catch (e) {
      return {
        token: false,
        data: e,
      };
    }
  },
};

module.exports = Token;
