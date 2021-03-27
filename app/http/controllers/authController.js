const USER  = require('../../models/user')

const bcrypt = require('bcrypt')

const passport = require('passport')

function authController(){

    return {
        login(request,response){
            response.render('auth/login');
        },
        register(request,response){
            response.render('auth/register');
        },
        async postRegister(request, response){
            const {name, email, password} = request.body
            console.log( request.body)
            console.log("email ::: "+ email)
            //validate requires
            if(!name || !email || !password){
                request.flash('error','All Fields are required')
                request.flash('name', name)
                request.flash('email', email)
                return response.redirect('/register')
            }

            USER.exists({email: email},(error, result) => {
                console.log("outside if")
                console.log(result);
                if(error){
                    console.log("inside if")
                    request.flash('error','Email id already exists')
                    request.flash('email', email)
                    return response.redirect('/register')
                }
            })
            

            // creating password to hash the password: 

            const hashPassword = await bcrypt.hash(password, 10);

            // creating user
            const user = new USER({

                name : name,
                email: email,
                password: hashPassword
           });
           
        user.save().then((user)=>{
                return response.redirect('/')
           }).catch(error => {
               request.flash('error', 'error occured while saving');
               response.redirect('/register');
           })
        },
        postlogin(request, response, next){
           
            passport.authenticate('local', (error, user, info)=> {
                console.log("posting method sada:::")
                if(error){
                    console.log("posting method sada error:::")
                    request.flash('error',  info.message)
                    return next(error)
                }
                if(!user){
                    console.log("posting method sada user:::")
                    request.flash('error',  info.message)
                    return response.redirect("/login")
                }

                request.login(user, (error) =>{

                    if(error){
                        request.flash('error',  info.message)
                        return next(error)
                    }

                    return response.redirect("/");
                })

            })(request, response, next)
        },

        
    }
}


module.exports = authController