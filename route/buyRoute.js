const express = require("express");
const route = new express.Router()
const auth = require('../auth/auth')
const Buy = require('../model/buyModel')
const Order = require('../model/orderModel')
// 
route.post('/buy/:prodid', auth.verifyUser, (req, res) => {
    new Buy({
        prodid: req.params.prodid,
        user: req.userInfo._id,
    }).save().then(data => {
        res.json(data)
    }).catch(e => {
        res.json(e)
    })
})
// 
route.post('/order/post',  (req, res) => {
    console.log(req.body);
    new Order(
       {
           fname:req.body.fname,
           lname:req.body.lname,
           forder:req.body.forder,
           sorder:req.body.sorder,
           address:req.body.address,
           quantity:req.body.quantity,
           price:req.body.price,
       }
    ).save().then(data => {
        res.json(data)
    }).catch(e => {
        res.json(e)
    })
})

route.get('/all/order', (req, res) => {
     Buy.find().populate('user').populate('prodid').then(data => {
        res.json(data)
    }).catch(e => {
        res.json(e)
    })
})
module.exports = route;