const { Strategy } = require("passport")
const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt

const UserModel = require('../models/UserModel')

module.exports = passport.use(new jwtStrategy({
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY
}, (payload, done) => {
    UserModel.findById(payload._doc._id)
        .then(user => {
            if (!user) {
                return done(null, false)
            } else {
                return done(null, user)
            }
        })
        .catch(error => {
            return done(error, false)
        })
}))