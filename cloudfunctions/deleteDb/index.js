// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let db = cloud.database();
  let result = await db.collection('dbtest').where({
    password: "123456"
  }).remove()
  return result;
}