var jwt = require('jsonwebtoken');
var passport = require('passport');
const config = require('../configs/config');


var tokenGeneration = async (payload) => {
    try {
        const token = jwt.sign(
            {data: payload}, config.jwt_secret ,{expiresIn:'15sec'}
        );
        const refresh_Token = jwt.sign(
            { data: payload }, config.jwt_secret, { expiresIn:'7d'}
        );
        return({token, refresh_Token});
    }catch(error){
        console.log('error')
        return false
    }
}
module.exports ={
    tokenGeneration
}