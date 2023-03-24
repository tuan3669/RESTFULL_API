const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
const auth = require('./routes/auth');
const role = require('./routes/role');
const permission = require('./routes/permission');
const post = require('./routes/post');
require('dotenv').config();

const app = express();

// middleware
app.use(
  cors({
    // origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect DB
const connectDB = require('./config/connectDB');
connectDB();
const PORT = process.env.PORT || 1234;

// login || register
app.use('/api/v1/auth', auth);
app.use('/api/v1/posts', post);
app.use('/api/v1/roles', role);
app.use('/api/v1/permissions', permission);

app.use((req, res, next) => {
  next(createError.NotFound('route not dedine'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: `${err.message}`,
  });
});

app.listen(PORT, () => {
  console.log('listning port::', PORT);
});
