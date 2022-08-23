const express = require("express");
const route = new express.Router();
const Product = require('../model/productmodel')
const multer = require('multer');
const auth = require('../auth/auth')
// 
// 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});
const upload = multer({ storage: storage });
route.post('/add/prod', upload.single('pphoto'), (req, res) => {
    console.log(req.body);
    new Product({
        pname: req.body.pname,
        pprice: req.body.pprice,
        pdesc: req.body.pdesc,
        pphoto: req.file.path
    }).save().then(data => {
        console.log(data);
        res.json({'posted':'okay'})
    }).catch(e => {
        console.log(e);
        res.json(e)
    })
})
// 
route.put('/update/prod/:id', upload.single('pphoto'), (req, res) => {
    Product.findByIdAndUpdate({ _id: req.params.id }, {
        pname: req.body.pname,
        pprice: req.body.pprice,
        pdesc: req.body.pdesc,
        pphoto: req.file.path
    },
    {new:true}
    ).then(data => {
        console.log(req.body);
        res.json(data)
    }).catch(e => [
        console.log(e),
        res.json(e)
    ])
})
// 
route.delete('/delete/prod/:id', (req, res) => {
    Product.findByIdAndDelete({ _id: req.params.id }).then(data => {
        res.json('sucess')
    }).catch(e => [
        res.json(e)
    ])
})
// 
route.get('/all/prod', (req, res) => {
    Product.find().then(d => {
        res.json(d)
    }).catch(e=>{
        res.json(e)
    })
})
// 
route.get('/get/prod',auth.verifyUser, (req, res) => {
    Product.findOne({_id:req.userInfo._id}).then(d => {
        console.log(d);
        res.json(d)
    }).catch(e=>{
        res.json(e)
    })
})
module.exports = route;