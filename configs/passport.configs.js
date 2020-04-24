const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
var AzureOAuth2Strategy  = require("passport-azure-oauth2");
var jwt = require("jwt-simple");
var Token = require('../helpers/auth.helper')


/**  sql db */
var DB = require('../models/sql');
//console.log('DB', DB);
var Managers = DB.managers;

module.exports = (passport) => {
    passport.use('managersLocalStrategy', new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    }, async (username, password, done) => {
        try {
            var manager = await Managers.findOne({
                where: {
                userName: username,
                password: password,
                }
            });
            if(!manager) return done(null, false, {message: 'User not found'});
            console.log('manager', manager);
            return done(null, manager, {message: 'Logged In Successfully'});
        } catch(error) {
            console.log('error:',error)
            done(error)
        }
    }
    )); 

    passport.use("O365", new AzureOAuth2Strategy({
        clientID: "10deb6a3-1883-4cc7-a5e3-3a22ed216b1a",
        clientSecret: "W.pDLw@YrJ/5bMSV8QXJj]an3OuKwNe4",
        callbackURL: "http://localhost:3000/auths/cb",
        //accessTokenUri: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
        //authorizationUri: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
        //resource: config.creds.resource,
        tenant: "749ac890-e68b-40c7-aede-ecdde57504c1",
        prompt: 'login',
        state: false,
        //scopes: ["openid", "profile", "offline_access"]
      },
      function (accessToken, refreshToken, params, profile,done){
            var user = jwt.decode(params.id_token,"",true)
            console.log(user)
            done(null,user);
    //async (accessToken, refreshToken, params, profile, done) => {
        //    var user = jwt.decode(params.id_token, "", true);
        //    try{
        //     var User = await Managers.findOne({
        //         where: {
        //             "emailAddress": user.email
        //         }   
        //     });
        //     console.log(User);
        //     // var at = (await Token.tokenGeneration(User)).token
        //     // var rt =(await Token.tokenGeneration(User)).refresh_Token 
        //     // console.log('accesstoken:'+at,'refreshtoken:'+rt); 
        //     Token = await Token.tokenGeneration(User);
        //     console.log("access token:"+Token.token+"refresh token:"+Token.refresh_Token)        
        //     if(!User) return done(null, false, {message: 'User not found in database'}); 
        //     // console.log(User);
            //console.log(params);
            //return done(null,params);
            // } catch(error) {
            // console.log('error')
            // }     
    }));

     
  
      passport.serializeUser(function(user, done) {
          //console.log("profile : ", user);
          done(null, user);
      });
  
      passport.deserializeUser(function(user, done) {
          //console.log("profile : ", user);
          done(null, user);
      });
  
};  
