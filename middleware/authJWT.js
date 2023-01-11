const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({
      message: "No JWT token!",
    });
  }

  jwt.verify(token, "PWA_very_secure11", (err, decoded) => { // token, secret
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;