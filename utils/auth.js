const jwt = require("jsonwebtoken");

const validateToken = (req) => {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("Token not found !");
      }
      const payloadToken = jwt.verify(token, process.env.SECRET_KEY);

      return payloadToken;
    } else {
      throw new Error("Not auth !");
    }
  } else {
    throw new Error("Not auth !");
  }
};

module.exports = validateToken;
