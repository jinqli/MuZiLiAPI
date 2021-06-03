const query = require("../utils/query");
const tables = {
  users: `create table if not exists users(
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   username VARCHAR(50) NOT NULL,
   email VARCHAR(50) NOT NULL,
   password VARCHAR(50) NOT NULL,
   avator VARCHAR(255) DEFAULT 'default.jpg'
  );`,
};
const createTable = function (tb) {
  query(
    tb,
    function (res) {
      // console.log('建表成功');
      return true;
    },
    function (err) {
      console.log("建表失败", err);
      return false;
    }
  );
};

for (let key in tables) {
  if (tables.hasOwnProperty(key)) {
    createTable(tables[key]);
  }
}
