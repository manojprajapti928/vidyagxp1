const jwt = require('jsonwebtoken');

const secretKey = 'This_is_my_key';


exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];  
  const token = authHeader && authHeader.split(' ')[1];
  // const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};
