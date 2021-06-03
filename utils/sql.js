const query = require("./query");
const mysql = require("mysql");
const config = require("../config").database;
const pool = mysql.createPool(config);
const getForeignInfo = function (tb, filter, foreign) {
  //主表，筛选条件,外键信息
  let queryStr = ""; //查询条件
  for (let key in filter) {
    queryStr += `${tb}.${key}=${filter[key]}&`;
  }
  queryStr = queryStr.substr(0, queryStr.length - 1);
  let as = "";
  let join = "";
  let tables = ` from ${tb} ${tb}`;
  for (let key1 in foreign) {
    let table = foreign[key1].table;
    let data = foreign[key1].data;
    let key = key1;
    join += ` join ${table} ${table} on ${tb}.${key}=${table}.id `;
    for (let key2 in data) {
      as += `,${table}.${key2} as ${data[key2]}`;
    }
  }
  let str =
    `select ${tb}.*` +
    as +
    tables +
    join +
    (queryStr == "" ? "" : "where " + queryStr);
  console.log(str);
  return str;
};
const SQL = {
  //插入一条记录
  insert: function (tb, data) {
    return new Promise((resolve, reject) => {
      let [keys, values] = [[], []];
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          keys.push(key);
          if (Object.prototype.toString.call(data[key]) == "[object String]") {
            values.push(`"${data[key]}"`);
          } else {
            values.push(data[key]);
          }
        }
      }
      query(
        `insert into ${tb} (${keys}) values (${values})`,
        function (res) {
          let id = res.insertId;
          let data = {
            code: 200,
            message: "添加成功",
            data: res,
          };
          query(
            `select * from ${tb} where id=${id}`,
            function (res) {
              data.data = res[0];
              resolve(data);
            },
            function (err) {
              resolve(data);
            }
          );
        },
        function (err) {
          resolve(err);
        }
      );
    });
  },
  //插入多条记录
  insertRows: function (tb, arr) {
    return new Promise((resolve, reject) => {
      let [keys, values] = [[], []];
      for (let i = 0; i < arr.length; i++) {
        let [data, value] = [arr[i], []];
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            if (i == 0) {
              keys.push(key);
            }
            if (
              Object.prototype.toString.call(data[key]) == "[object String]"
            ) {
              value.push(`"${data[key]}"`);
            } else {
              value.push(data[key]);
            }
          }
        }
        values.push(`(${value})`);
      }
      query(
        `insert into ${tb} (${keys}) values ${values}`,
        function (res) {
          let data = {
            code: 200,
            message: "添加成功",
            data: res,
          };
          let ids = [];
          for (let i = 0; i < res.affectedRows; i++) {
            ids.push(res.insertId + i);
          }
          query(
            `select * from ${tb} where id in (${ids})`,
            function (res) {
              data.data = {
                list: res,
                size: res.length,
              };
              resolve(data);
            },
            function (err) {
              resolve(data);
            }
          );
        },
        function (err) {
          resolve(err);
        }
      );
    });
  },
  //根据id删除单条记录
  delete: function (tb, id) {
    return new Promise((resolve, reject) => {
      query(
        `delete from ${tb} where id=${id}`,
        function (res) {
          let data = {
            code: 200,
            message: "删除成功",
            data: res,
          };
          resolve(data);
        },
        function (err) {
          resolve(err);
        }
      );
    });
  },
  //根据id数组删除多条记录
  deleteRows: function (tb, data) {
    return new Promise((resolve, reject) => {
      query(
        `delete from ${tb} where id in (${data})`,
        function (res) {
          let data = {
            code: 200,
            message: "删除成功",
            data: res,
          };
          resolve(data);
        },
        function (err) {
          resolve(err);
        }
      );
    });
  },
  update: function (tb, id, data) {
    //根据id修改单条记录
    return new Promise((resolve, reject) => {
      let [str, index] = ["", 0];
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          if (index != 0) {
            str += ",";
          }
          if (Object.prototype.toString.call(data[key]) == "[object String]") {
            str += `${key}="${data[key]}"`;
          } else {
            str += `${key}=${data[key]}`;
          }
          index++;
        }
      }
      query(
        `update ${tb} set ${str} where id=${id}`,
        function (res) {
          let data = {
            code: 200,
            message: "修改成功",
            data: res,
          };
          query(
            `select * from ${tb} where id=${id}`,
            function (res) {
              data.data = res[0];
              resolve(data);
            },
            function (err) {
              resolve(data);
            }
          );
        },
        function (err) {
          resolve(err);
        }
      );
    });
  },
  updateRows: function (tb, arr) {
    //修改多条记录
    return new Promise((resolve, reject) => {
      let [str, ids, len, keys] = ["", [], arr.length, Object.keys(arr[0])];
      for (let x = 0; x < len; x++) {
        ids.push(arr[x].id);
      }
      for (let i = 0; i < keys.length; i++) {
        let k = keys[i];
        if (k != "id") {
          str += `${k} = case id `;
          for (let j = 0; j < len; j++) {
            str += `when ${arr[j].id} then `;
            if (
              Object.prototype.toString.call(arr[j][k]) == "[object String]"
            ) {
              str += `"${arr[j][k]}" `;
            } else {
              str += `${arr[j][k]} `;
            }
          }
          str += "end";
          if (i < keys.length - 1) {
            str += ",";
          }
        }
      }
      query(
        `update ${tb} set ${str} where id in (${ids})`,
        function (res) {
          let data = {
            code: 200,
            message: "修改成功",
            data: res,
          };
          query(
            `select * from ${tb} where id in (${ids})`,
            function (res) {
              data.data = {
                list: res,
                size: res.length,
              };
              resolve(data);
            },
            function (err) {
              resolve(data);
            }
          );
        },
        function (err) {
          resolve(err);
        }
      );
    });
  },
  //根据id获取
  query: function (tb, id, foreign) {
    return new Promise((resolve, reject) => {
      query(
        `select * from ${tb} where id=${id}`,
        function (res) {
          let data = {
            code: 200,
            message: res.length == 0 ? "查无数据" : "获取成功",
            data: res.length == 0 ? {} : res[0],
          };
          resolve(data);
        },
        function (err) {
          resolve(err);
        }
      );
    });
  },
  //根据条件准确查询
  search: function (tb, data, foreign) {
    let queryStr = ""; //查询条件
    for (let key in data) {
      queryStr += `${key}=${data[key]}&`;
    }
    queryStr = queryStr.substr(0, queryStr.length - 1);
    let str;
    if (foreign) {
      str = getForeignInfo(tb, data, foreign);
    } else {
      str = `select * from ${tb} where ${queryStr}`;
    }
    return new Promise((resolve, reject) => {
      query(
        str,
        function (res) {
          resolve({
            code: 200,
            message: "获取成功",
            data: res,
          });
        },
        function (err) {
          resolve(err);
        }
      );
    });
  },
  searchVague: function (tb, val, fields, foreign) {
    //根据条件模糊查询
    let str = `select * from ${tb} where concat(`;
    for (let i = 0; i < fields.length; i++) {
      str += `${fields[i]},`;
    }
    str = str.substring(0, str.length - 1);
    str += `) like %${val}%`;
    if (fields.length == 1) {
      str = `select * from ${tb} where ${fields[0]} like '%${val}%'`;
    }
    return new Promise((resolve, reject) => {
      query(
        str,
        function (res) {
          resolve({
            code: 200,
            message: "获取成功",
            data: res,
          });
        },
        function (err) {
          resolve(err);
        }
      );
    });
  },
};

module.exports = SQL;
//关联外键数据格式
/*
foreign:{
  foreignKey1:{
    table:'表名',
    data:{  //要从外键关联表中取出的数据
      键名1:别名,
      键名2:别名,
      ...
    }
  },
  foreignKey2:{
    table:'表名',
    data:{
      键名1:别名,
      键名2:别名,
      ...
    }
  },
  ...
}
*/
