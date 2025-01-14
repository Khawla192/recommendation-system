require('dotenv').config();
require('./config/database');

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

// require the middleware!
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

// require the Controllers
const usersController = require('./controllers/users.js');
const laptopsController = require('./controllers/laptops.js');
const authController = require('./controllers/auth.js');

const port = process.env.PORT ? process.env.PORT : '3000';
const path = require('path');
const User = require('./models/user.js');

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passUserToView);

//ROUTES
// PUBLIC ROUTES
app.get('/', async (req, res) => {
  try {
    if (req.session.user) {
      res.redirect(`/users/${req.session.user._id}/laptops`);
    } else {
      const allUsers = await User.find().populate('laptops');
      res.render('index.ejs', { users: allUsers });
    }
  } catch (error) {
    console.error(error);
    // res.status(500).send("An error occurred.", error);
    res.redirect('/');
  }
});

app.get('/showAll/:showId', async (req, res) => {
  try {
    res.redirect('/auth/sign-in');
    if (req.session.user) {
      res.redirect(`/users/${req.session.user._id}/laptops`);
    } else {
      const allUsers = await User.find().populate('laptops');
      const laptop = allUsers.laptops || [];
      res.render('showAll.ejs', {
        laptop,
        user: allUsers,
      });
    }
  } catch (error) {
    console.error(error);
    // res.status(500).send("An error occurred.", error);
    res.redirect('/');
  }
});

// PROTECTED ROUTES
app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/laptops', laptopsController);
app.use('/users', usersController);

// LISTENER
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
