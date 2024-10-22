const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = 'This_is_my_key'; 

exports.signup = async (req, res) => {
  try {
    
    const { username, email, password, confirmPassword } = req.body;

    console.log(req.body); 

    
    if (!password || !confirmPassword) {
      return res.status(400).json({ message: 'Password and confirm password are required' });
    }

    
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });

    return res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Signup failed', error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log('Request Body:', req.body);
  
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
    console.log("--------", token);
    
    return res.json({ token, message: 'Login successful', redirectUrl: '/dashboard' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
