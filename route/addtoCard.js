const express = require("express");
const route = new express.Router()
const auth = require('../auth/auth')
const Addtocart = require('../model/addtocartmodel')
route.post('/addtocart/:prodid', auth.verifyUser, (req, res) => {
    // console.log(req.userInfo._id);
    new Addtocart({
        prodid: req.params.prodid,
        user: req.userInfo._id,
    }).save().then(data => {
        console.log(data);
        res.status(200).json(data)
    }).catch(e => {
        console.log(e)
        res.json(e)
    })
})


// get card
route.get('/get/card', auth.verifyUser, (req, res) => {
    Addtocart.find({ user: req.userInfo._id }).populate('prodid').then(data => {
        res.json(data)
    }).catch(e => {
        res.json(e)
    })
})

// 
route.put('/update/prod/:id', (req, res) => {
    Addtocart.findByIdAndUpdate({ _id: req.params.id }, {
        pname: req.body.pname,
        pprice: req.body.pprice,
        pdesc: req.body.pdesc,
        pphoto: req.file.path
    }).then(data => {
        res.json(data)
    }).catch(e => [
        res.json(e)
    ])
})
// 
route.delete('/delete/card/:id', (req, res) => {
    Addtocart.findByIdAndDelete({ _id: req.params.id }).then(data => {
        res.json(data)
        console.log("delete");
    }).catch(e => {
        console.log(e);
        res.json(e)
})
})
// 
route.get('/all/prod', (req, res) => {
    Addtocart.find().then(d => {
        res.json(d)
    }).catch(e => {
        res.json(e)
    })
})
module.exports = route;