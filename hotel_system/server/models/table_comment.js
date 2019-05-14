const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost:27017/test'); 
 
// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));
/************** 定义模式loginSchema **************/
const commentSchema = mongoose.Schema({
    order_id: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    addr: {
      type: String,
      required: true
    },
    img_src: {
      type: String,
      required: true
    }
});
 
/************** 定义模型Model **************/
const Models = {
    Comment: mongoose.model('Comment', commentSchema)
}
 
module.exports = Models;