const models = require('./db');
const userModel = require('./models/table_user');
const roomModel = require('./models/table_room');
const orderModel = require('./models/table_order');
const commentModel = require('./models/table_comment');
const roomDetailModel = require('./models/table_roomDetail');
const express = require('express');
const router = express.Router();

const typeName = {
    '00': '标准单床房',
    '01': '标准大床房',
    '02': '商务大床房',
    '03': '豪华大床房',
    '10': '标准双床房',
    '11': '标准双大床房',
    '12': '商务双大床房',
    '13': '豪华双大床房'
};
 

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/
 
// 创建账号接口
router.post('/api/register/createAccount',(req,res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    userModel.User.find({
        account: req.body.account
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            if (data.length === 0) {
                let newAccount = new userModel.User({
                    name: req.body.name,
                    account : req.body.account,
                    password : req.body.password,
                    tel: req.body.tel,
                    idcard: req.body.idcard
                });
                // 保存数据newAccount数据进mongoDB
                newAccount.save((err,data) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send('createAccount successed');
                    }
                });
            } else {
                res.send({
                    isExistence: true,
                    message: '用户名已存在，请更换'
                })
            }
        }
    })
});
// 获取已有账号接口
router.post('/api/register/getAccount',(req,res) => {
    // 通过模型去查找数据库
    let account = req.body.account;
    userModel.User.find({
        account: String(account)
    }, (err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data.length === 0 ? '找不到此用户，请重写出入用户名' : data);
        }
    });
});

router.post('/api/user/changePassword', (req, res) => {
    let {src_pass, account, password} = req.body;
    if (req.body.src_pass) {
        userModel.User.find({
            account: req.body.account
        }).then(data => {
            if (data[0].password !== src_pass) {
                res.send({
                    flag: false,
                    msg: '原密码输入错误，请重新输入'
                })
            } else {
                userModel.User.updateOne({ account }, {
                    password: req.body.password
                }).then(data => {
                    res.send({
                        flag: true,
                        msg: '密码修改成功！'
                    });
                }).catch(err => {
                    console.log(err);
                })
            }
        })
    } else {
        userModel.User.updateOne({ account: req.body.account}, {
            password: req.body.password
        }).then(data => {
            res.send('密码修改成功，您现在可以使用新密码登录！');
        }).catch(err => {
            console.log(err);
        })
    }
})

router.post('/api/login/getAccount',(req,res) => {
    let {account, tel, idcard} = req.body;
    userModel.User.find({
        account: String(account)
    }, (err,data) => {
        if (err) {
            res.send(err);
        } else {
            if (data.length === 0) {
                res.send({
                    is_pass: false,
                    msg: '查找不到此用户，请重新输入账号！'
                });
            } else if (tel !== data[0].tel) {
                res.send({
                    is_pass: false,
                    msg: '您输入的电话号码与绑定的不匹配！'
                });
            } else if (idcard !== data[0].idcard) {
                res.send({
                    is_pass: false,
                    msg: '您输入的身份证号码与绑定的不匹配！'
                });
            } else {
                res.send({
                    is_pass: true,
                    msg: '验证成功！'
                });
            }
        }
    });
});

router.post('/api/room/createRoom', (req, res) => {
    let newRoom = new roomModel.Room({
        city: req.body.city,
        img_src : req.body.img_src,
        type : req.body.type,
        room_desc: req.body.desc,
        score: req.body.score,
        room_price: req.body.price
    });
    // 保存数据newAccount数据进mongoDB
    newRoom.save((err,data) => {
        if (err) {
            res.send(err);
        } else {
            console.log('createAccount successed');
        }
    });
});

router.post('/api/order/createOrder', (req, res) => {
    let params = req.body;
    let newOrder = new orderModel.Order({
        username: params.username,
        idcard: params.idcard,
        order_account: params.account,
        type: params.type,
        room_type: params.room_type,
        start_date: params.start_date,
        end_date: params.end_date,
        order_price: params.price
    });
    newOrder.save((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send('预订成功');
        }
    })
});

router.post('/api/order/getOrder', (req, res) => {
    let { order_account, status } = req.body;
    if (order_account) {
        orderModel.Order.find({
            order_account,
            status
        }, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                data.forEach(item => {
                    item.type = typeName[`${item.type}${item.room_type}`];
                })
                res.send(data);
            }
        })
    } else {
        orderModel.Order.find({
            status
        }, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                data.forEach(item => {
                    item.type = typeName[`${item.type}${item.room_type}`];
                })
                res.send(data);
            }
        })
    }
});

router.post('/api/order/deleteOrder', (req, res) => {
    orderModel.Order.findOneAndDelete({
        _id: req.body._id
    }).then(data => {
        res.send('退订成功');
    }).catch(err => {
        console.log(err);
    })
});

router.put('/api/order/updateOrder/:id', (req, res) => {
    orderModel.Order.updateOne({_id: req.params.id}, {
        start_date: req.body.start_date,
        end_date: req.body.end_date
    }).then(data => {
        res.send('改期成功');
    }).catch(err => {
        console.log(err);
    })
})

router.put('/api/room/updateRoom/:id', (req, res) => {
    roomModel.Room.updateOne({ _id: req.params.id}, {
        total: req.body.total + req.body.newCount
    }).then(data => {
        res.send('新增成功');
    }).catch(err => {
        console.log(err);
    })
})

router.put('/api/room/updateRoomDescAndPrice/:id', (req, res) => {
    roomModel.Room.updateOne({ _id: req.params.id}, {
        room_desc: req.body.room_desc,
        room_price: req.body.room_price
    }).then(data => {
        res.send('修改成功');
    }).catch(err => {
        console.log(err);
    })
})

router.put('/api/order/updateOrderStatus/:id', (req, res) => {
    if (req.body.rate) {
        orderModel.Order.updateOne({_id: req.params.id}, {
            rate: req.body.rate,
            comment: req.body.comment,
            status: req.body.status
        }).then(data => {
            res.send('评价成功');
        }).catch(err => {
            res.send('操作失败');
        })
    } else {
        orderModel.Order.updateOne({_id: req.params.id}, {
            status: req.body.status,
            room_num: req.body.roomNum
        }).then(data => {
            res.send('操作成功');
        }).catch(err => {
            res.send('操作失败');
        })
    }
})

router.post('/api/order/updateOrderStatusByNum', (req, res) => {
    orderModel.Order.updateOne({room_num: req.body.roomNum, status: 1}, {
            status: req.body.status
        }).then(data => {
            res.send('操作成功');
        }).catch(err => {
            res.send('操作失败');
        })
})

router.post('/api/order/getRoomCount', (req, res) => {
    let { date, type, room_type } = req.body;
    orderModel.Order.find({
        start_date: date,
        type,
        room_type
    }, (err, order_data) => {
        if (err) {
            res.send(err);
        } else {
            let count = order_data.length;
            roomModel.Room.find({
                type,
                room_type
            }, (err, room_data) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send({
                        count: room_data[0].total - count
                    })
                }
            })
        }
    })
})

router.post('/api/comment/createComment', (req, res) => {
    let { order_id, author, title, date, desc, addr, img_src } = req.body;
    let newComment = new commentModel.Comment({
        order_id,
        author,
        title,
        date,
        desc,
        addr,
        img_src
    });
    newComment.save((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send('预订成功');
        }
    })
})

router.post('/api/comment/getComment', (req, res) => {
    commentModel.Comment.find({}, (err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
})

router.get('/api/room/getRoomInfo', (req, res) => {
    roomModel.Room.find({}, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
})

router.post('/api/roomDetail/createRoomDetail', (req, res) => {
    let { name, count, number } = req.body;
    if (typeof number === 'number') {
        let newRoomDetail = new roomDetailModel.RoomDetail({
            name,
            num: number
        });
        newRoomDetail.save((err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send('预订成功');
            }
        })
    } else {
        for(let i = 0; i < count; i++) {
            new roomDetailModel.RoomDetail({
                name,
                num: parseInt(number[i], 10)
            }).save()
        }
    }
})

router.get('/api/roomDetail/getRoomDetail', (req, res) => { 
    if (req.query.type) {
        roomDetailModel.RoomDetail.find({
            name: req.query.type,
            status: 0
        }, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
            }
        })
    } else {
        roomDetailModel.RoomDetail.find({}, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
            }
        })
    }
})

router.put('/api/room/updateRoomDetailStatus/:id', (req, res) => {
    roomDetailModel.RoomDetail.updateOne({ _id: req.params.id}, {
        status: req.body.status
    }).then(data => {
        res.send('操作成功');
    }).catch(err => {
        console.log(err);
    })
})

router.post('/api/room/updateRoomDetailStatusByNum', (req, res) => {
    roomDetailModel.RoomDetail.updateOne({ num: req.body.num}, {
        status: req.body.status
    }).then(data => {
        res.send('操作成功');
    }).catch(err => {
        console.log(err);
    })
})

 
module.exports = router;