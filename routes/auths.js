const router = require('express').Router();
const passport = require('passport');
require('../configs/passport.configs')(passport);
const jwt = require('jsonwebtoken');
const config = require('../configs/config');
//const GitHubStrategy = require('passport-github').Strategy;
var Token = require('../helpers/auth.helper');




var DB = require('../models/sql');
var manager = DB.managers;

var refreshTokensDir = {};

router.post('/login',function (req, res){
    passport.authenticate('managersLocalStrategy', {session: false, state:"login"}, (error, manager, info) => {
        console.log(error)
        if(error||!manager) {
            return res.status(400).json({
                message: 'something is not right',
                //manager: manager
            });
        }
        const token = jwt.sign(
            {data: manager}, config.jwt_secret ,{expiresIn:'15sec'}
        );
        //res.json({manager,token});
        const refreshToken = jwt.sign(
            { data: manager }, config.jwt_secret, { expiresIn:'7d'}
          );
          res.json({token, refreshToken});
    })(req, res);
});



router.get("/login", passport.authenticate("O365",{state:'login'}));

router.get("/signup",passport.authenticate("O365",{state:'signup'}));

router.get("/cb", passport.authenticate("O365"), async function (req, res) {                                         
  console.log("user",req.user);
  if(req.query.state === 'login'){
    console.log(req.query.state)
    //var user = jwt.decode(params.id_token, "", true);
        try{
         var User = await manager.findOne({
             where: {
                 "emailAddress": req.user.email
             }   
         });
         if(!User) return {message: 'User not found in database'};
         console.log(User);
         if(!User) return {message: 'User not found in database'};
         Token = await Token.tokenGeneration(User);
         console.log("access token:"+Token.token+"refresh token:"+Token.refresh_Token)        
         //if(!User) return {message: 'User not found in database'}; 
         // console.log(User);
         //res.redirect('/')
        return {accessToken:Token.token,refreshToken:Token.refresh_Token};
         } catch(error) {
         console.log(error)
         }
  }
  else if (req.query.state === 'signup') {
    //var user = jwt.decode(params.id_token, "", true);
        try{
         var User = await manager.findOrCreate({
             where: {
                 "emailAddress": req.user.email
             }   
         });
         if(!User) return {message: 'User not found in database'};
         console.log(User);
         Token = await Token.tokenGeneration(User);
         console.log("access token:"+Token.token+"refresh token:"+Token.refresh_Token)        
         //if(!User) return {message: 'User not found in database'}; 
         // console.log(User);
        return {accessToken:Token.token,refreshToken:Token.refresh_Token};
         } catch(error) {
         console.log(error)
         }     
  }  
}
);




// sending refresh token and verifying  and getting a new access token that will last for one day
router.post('/tokens', function (req, res, next) {
    var refreshToken = req.body.refreshToken;
    if (refreshToken){
        jwt.verify(refreshToken, config.jwt_secret, function(err,decoded){
          if(err) {
            return res.status(401).json({"error":true, "message": "unauthorized access."});
          }
         console.log('decoded',decoded)
        });
        const token = jwt.sign(
            { data: manager }, '6QRMOCxT0Y', { expiresIn:'1d' }
        );
        res.json({manager, token});
    }
    else {
      res.sendStatus(401)
    }
  })

module.exports = router
