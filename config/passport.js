require('dotenv').config()
const { Strategy, ExtractJwt } = require('passport-jwt')

const {User} = require('../models')
 
// object made for strategy
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

const JWT_STRATEGY = new Strategy(options, async (jwtPayload, done)=>{
    try {
        const user = await User.findById(jwtPayload.id)
        if (user) {
            return done(null,user);
        } else {
            return done(null, false);
        }

    } catch (error) {
        console.log('---Error inside of passport config---')
        console.log(error)
    }
})

module.exports = async (passport) => {
    passport.use(JWT_STRATEGY)
}