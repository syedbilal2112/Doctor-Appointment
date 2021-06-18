
const passport = require('passport');
const localStrategy = require('passport-local');
const userDao = require('../app/models/dao/userDao');
const user = require('../app/models/dto/user');
const constant = require('../utils/constant');
const utilities = require('../utils/utilities');
const communication_helper = require('../utils/communication_helper');
const communication = require('../utils/communication');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');

//create a passport middleware to handle  user registration
passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        console.log(req.body);
        const name = req.body.name;
        const role = req.body.role;
        const otp = utilities.getRandomNumber(5);
        const mobileNumber = req.body.mobileNumber;

        let user = await userDao.getOne({ email: email });
        // console.log("user", user);
        if (user.length > 0 && !user[0].isValidated){
            const daq = await userDao.update({email},{ otp: otp })
            const mailOptions = await communication_helper.sendWelcomeMessageEmail(req.body.email, req.body.name, otp);
            await communication.sendMail(mailOptions);
            return done(null, { "message": false, isExists: true })
        }
        // const hash = await bcrypt.hash(password, 10)
        // password = hash;

        const daq = await userDao.addUser({ name, email, password, mobileNumber, role, otp: otp })
        const mailOptions = await communication_helper.sendWelcomeMessageEmail(req.body.email, req.body.name, otp);
        await communication.sendMail(mailOptions);
        return done(null, { "message": true });

    } catch (err) {
        return done(null, { "message": false })
    }
}));

let isValidPassword = async (password, userPassword) => {
    const compare = await bcrypt.compare(password, userPassword);
    return compare
}

// user login
passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user1 = await userDao.getOne({ email });

        if (!user1[0]) {
            return done(null, false, { message: 'user not found' });
        }

        const validate = await isValidPassword(password, user1[0].password);
        if (!validate) {
            return done(null, false, { message: 'wrong password' });
        }

        return done(null, user1[0], { message: 'logged in successfull' })


    } catch (err) {
        return done(err)
    }
}))

passport.use(new JWTstrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token')
}, async (token, done) => {
    try {
        return done(null, token.user)
    } catch (err) {
        done(err)
    }
}))