const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const mongoData = require('./mongoData/mongoData');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');

const postsRoutes = require('./routes/posts.routes');
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

/* PASSPORT */
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: CALLBACK_ADDRESS,
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
  console.log(done);
}));

// serialize user when saving to session
passport.serializeUser((user, serialize) => {
  serialize(null, user);
});

// deserialize user when reading from session
passport.deserializeUser((obj, deserialize) => {
  deserialize(null, obj);
});

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
app.use('/auth', authRoutes);
app.use('/api', postsRoutes);
app.use('/api', usersRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* MONGOOSE */
//const dbURI = process.env.NODE_ENV === 'production' ? `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.g9pgz.mongodb.net/new_wave?retryWrites=true&w=majority` : 'mongodb://localhost:27017/NewWaveDB';
const dbURI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.g9pgz.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+ port);
});
