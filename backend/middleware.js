const { JWT_SECRET } = require('./config');
const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {

   const token = req.headers?.authorization?.split(" ")[1] || "";

   if (!token) {
      return res.status(403).json({
         message: "Token is EMTPY",
      })
   }

   try {

      const decoded = jwt.verify(token, JWT_SECRET)
      req.userId = decoded.userId

      next();

   } catch (error) {
      res.status(403).json({
         message: "You can't access this",
      })
   }
}