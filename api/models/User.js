/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

   attributes: {

    name: {
      type: 'string', 
      //unique: true, 
      required: true
    },
    password:{
      type: 'string', 
      minLength: 6, 
      unique: true
    }

  }, 

  // hash password
  beforeCreate: function(attr, next) {
    var bcrypt = require('bcrypt');

    bcrypt.genSalt(10, function(err, salt) {

      if (err) return next(err);

      bcrypt.hash(attr.password, salt, function(err, hash) {
        if (err) return next(err);

        attr.password = hash;

        next();
      });
    });
  }, 

  signUp: function(inputs, cb) {
      User.create({
        name: inputs.name,
        password: inputs.password
      }).exec(cb); 
  }
}