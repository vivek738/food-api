const express = require("express");
const route = new express.Router();
const Menuproduct = require('../model/menuproductmodel')
const multer = require('multer')
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
route.post('/add/menu', upload.single('pphoto'), (req, res) => {
    new Menuproduct({
        pname: req.body.pname,
        pprice: req.body.pprice,
        pdesc: req.body.pdesc,
        pphoto: req.file.path
    }).save().then(data => {
        res.json(data)
    }).catch(e => {
        res.json(e)
    })
})
// 
route.put('/update/prod/:id', upload.single('pphoto'), (req, res) => {
    Menuproduct.findByIdAndUpdate({ _id: req.params.id }, {
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
route.delete('/delete/prod/:id', (req, res) => {
    Menuproduct.findByIdAndDelete({ _id: req.params.id }).then(data => {
        res.json(data)
    }).catch(e => [
        res.json(e)
    ])
})
// 
route.get('/all/prod', (req, res) => {
    Menuproduct.find().then(d => {
        res.json(d)
    }).catch(e=>{
        res.json(e)
    })
})
// 
route.get('/get/prod/:id', (req, res) => {
    Menuproduct.findOne({_id:req.params.id}).then(d => {
        res.json(d)
    }).catch(e=>{
        res.json(e)
    })
})
module.exports = route;