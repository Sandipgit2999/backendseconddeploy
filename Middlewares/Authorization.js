const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorization = (req, res, next) => {
  if (!req.headers.authorization) {
    res.send("please login");
  } else {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.secret, function (err, decoded) {
      console.log("authorization",decoded);
      if (err) {
        res.send("please login");
      } else {
        req.body.userId = decoded.userId;
        next();
      }
    });
  }
};

module.exports = {
  authorization,
};
