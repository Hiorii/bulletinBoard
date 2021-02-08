const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoData = require('./configData/mongoData');
const passportSetup = require('./settings/passport');
const connectToDb = require('./settings/db');

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true };

/* MIDDLEWARE */
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

/* API ENDPOINTS */
app.use('/auth', require('./routes/auth.routes'));
app.use('/api', require('./routes/posts.routes'));
app.use('/api', require('./routes/users.routes'));

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* CONNECT TO DATABASE */
connectToDb();

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+ port);
});
