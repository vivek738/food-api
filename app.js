const { json } = require("body-parser");
const express = require("express");
const app = express();
app.use(json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors')
app.use(cors())

require("./db/db");
const userRouter = require("./route/userroute");
app.use(userRouter);

const Productsroute = require('./route/productRoute')
app.use(Productsroute)

const addtocart = require('./route/addtoCard')
app.use(addtocart)

const Menuproduct =require('./route/menuproductRoute')
app.use(Menuproduct)

const Buy = require('./route/buyRoute');
app.use(Buy)

app.use(express.static(__dirname+'/'))

app.listen(90);