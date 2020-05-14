const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = passport => {
<<<<<<< HEAD
  passports.use(new LocalStrategy({
=======
  passport.use(new LocalStrategy({
>>>>>>> add local login login to sns service by using passport
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const exUser = await User.find({ where: { email }});
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { message: 'Password is not correct!' });
        }
      } else {
        done(null, false, { message: 'You have to join!' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};