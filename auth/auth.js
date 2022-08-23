const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");

module.exports.verifyUser = (req, res, next) => {
  try {
    const tokens = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(tokens, "anysecretkey");
    User.findOne({ _id: data.cusId })
      .then((result) => {
        // console.log(result);
        req.userInfo = result;
        next();
      })
      .catch((e) => {
        res.json({ error: e });
      });
  } catch (e) {
    res.json({ error: "Invalid Access" });
  }
  //   console.log(data);
};
