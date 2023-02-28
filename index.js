const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
const authRoutes = require('./routes/authRoutes');
const passportConfig = require('./services/passport');
const bodyParser = require('body-parser');
const billingRoutes = require('./routes/billingRoutes');

mongoose.set('strictQuery', false);
mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err))

const app = express();

app.use(bodyParser.json());
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}))
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(5000);


