const express = require('express');
const sequelize = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const dashboardRoutes = require('./routes/dashboardRoutes.js');
const itemRoutes = require('./routes/itemRoutes.js');
const categoryRoutes = require('./routes/categoryRoutes.js')
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(express.json());

app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/', dashboardRoutes);

app.use('/apiItem', itemRoutes);
app.use('/apiCategory', categoryRoutes);



app.use('/uploads', express.static(path.join(__dirname, 'Images')));


sequelize.sync({alter: true}).then(() => {
  console.log('Database connected!');
  app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
  });
});
