const jwt = require('jsonwebtoken');

const secretKey = 'This_is_my_key';

exports.getDashboard = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    res.status(200).json({ user: decoded });
  });
};
