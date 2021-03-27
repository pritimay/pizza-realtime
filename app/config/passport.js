//you need to install this library - > passport-local
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

function init(passport){

    passport.use(new LocalStrategy({usernameFiled : 'email'},async  (email, password, done) => {

        //Login check if email exists

        const user = await User.findOne({email: email})    
        if(!user){
            return done(null, false, {message : 'No user with this email'})
        }

        bcrypt.compare(password, user.password).then(match => {

            if(match){
                return done(null, user, {message : 'Logged in succcesfull'})
            }else{
                return done(null, false, {message : 'Wrong username or password'})
            }
        }).catch(error =>{
            return done(null, false, {message : 'Something went wrong'})
        })
    }))

    passport.serializeUser((user, done) => {

       User.findById(id,(error, user)=>{
            done(error, user);
       })
    })

    passport.deserializeUser((id, done) => {

        done(null, user._id);
    })


}

module.exports = init