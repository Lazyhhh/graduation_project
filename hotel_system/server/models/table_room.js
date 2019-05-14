const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost:27017/test'); 
 
// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));
/************** 定义模式loginSchema **************/
const roomSchema = mongoose.Schema({
    img_src: {
      type: String,
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
    room_desc: {
      type: String,
      required: true
    },
    room_price: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
});
 
/************** 定义模型Model **************/
const Models = {
    Room: mongoose.model('Room', roomSchema)
}
 
module.exports = Models;