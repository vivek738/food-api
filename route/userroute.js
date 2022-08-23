const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");

const userRouter = new express.Router();

// import the model from models folder
const User = require("../model/usermodel");
const e = require("express");
const { route } = require("express/lib/application");

// route for customer registration
userRouter.post("/user/registration-form", (req, res) => {
  const username = req.body.username;
  User.findOne({ username: username })
    .then((userData) => {
      if (userData != null) {
        res.json({ message: "User Already Exists!" });
        return;
      }
      const email_address = req.body.email_address;
      const password = req.body.password;
      bcryptjs.hash(password, 10, (e, hashed_password) => {
        const fullname = req.body.fullname;
        const userDetail = new User({
          email_address: email_address,
          username: username,
          password: hashed_password,
          userRole: 0,
        });
        userDetail
          .save()
          .then(() => {
            res.json({ message: "Registered Successfully!" });
          })
          .catch((e) => {
            res.json(e);
          });
      });
      // })
    })
    .catch();
});

// login route - for user
userRouter.post("/user/login-form", (req, res) => {
  const email = req.body.username;
  console.log(email);
  User.findOne({ username: email }).then((userData) => {
    // console.log(userData);
    if (userData === null) {
      res.json({ message: "Invalid" });
      return;
    }
    // need to check password
    const password = req.body.password;

    bcryptjs.compare(password, userData.password, (e, result) => {
      // true - correct  pw
      if (result === false) {
        console.log('error');
        return res.json({ message: "Invalid" });
      }
      // ticket generate - jsonwebtoken
      const token = jwt.sign({ cusId: userData._id }, "anysecretkey");
      console.log(req.body);
      res.json({
        token: token, userRole: userData.userRole,
        verified: userData.verified, message: "Success"
      });
    });
  });
});

userRouter.get('/get/user', (req, res) => {
  User.find().then(d => { res.json(d) }).catch(e=>{
    res.json(e)
  })
})

userRouter.delete("/user/delete", auth.verifyUser, (req, res) => {
  res.json({ message: userInfo.fullname });
  // res.json({ msg: "Deleted!" });
});

module.exports = userRouter;
