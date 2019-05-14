const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost:27017/test'); 
 
// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));
/************** 定义模式loginSchema **************/
const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    account : {
      type: String,
      required: true,
      trim: true
    },
    password : {
      type: String,
      required: true
    },
    sex: String,
    tel: {
      type: String,
      required: true,
      trim: true
    },
    idcard: {
      type: String,
      required: true,
      trim: true
    },
    registertime: {
      type:Date,   
      default:Date.now
    },
});
 
/************** 定义模型Model **************/
const Models = {
    User: mongoose.model('User',userSchema)
}
 
module.exports = Models;