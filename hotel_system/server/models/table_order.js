const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost/test'); 
 
// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));
/************** 定义模式loginSchema **************/
const orderSchema = mongoose.Schema({
    order_account: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    idcard: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    room_type: {
      type: String,
      required: true
    },
    order_date: {
      type: Date,
      default: new Date()
    },
    start_date: {
      type: String,
      required: true
    },
    end_date: {
      type: String,
      required: true
    },
    order_price: {
      type: Number,
      required: true
    },
    status: {
      type: Number,
      default: 0
    },
    comment: String,
    rate: Number,
    room_num: Number
});
 
/************** 定义模型Model **************/
const Models = {
    Order: mongoose.model('Order', orderSchema)
}
 
module.exports = Models;