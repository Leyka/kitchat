/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcrypt');

module.exports = {

  // POST /login
  login: function(req, res, next) {

    if(req.session.me) {
      return res.redirect('/me');
    }

    User.findOneByName(req.param('name'), function(err, user){

      if (err) {
         res.status(500); 
      }


      if (user) {
        bcrypt.compare(req.param('password'), user.password, function(err, match){

          if (err) {
             res.status(500);
          }


          //everything is ok!
          if (match) {
            req.session.me = user.id;
            res.redirect('/me');
          }
          else
          {
            req.session.me = null;
            res.render('user/login', {error: 'Invalid password'});
          }

        });
      }
      else {
        res.render('user/login', {error: 'User not found'});
      }

    });
  },

  // GET /logout
  logout: function(req, res) {
    req.session.me = null;
    res.redirect('/');
  },

  // POST /signup
  signup: function(req, res) {

    // Todo: check if user exist 
    
    User.signUp({
      name: req.param('name'),
      password: req.param('password')
    }, function(err, user){

        if (err) {
          res.negotiate(err);
        }

        // everything is ok
        req.session.me = user.id;
        res.redirect('/me');
    });
  },

  // GET /me
  me: function(req, res) {

    if (!req.session.me) {
      res.redirect('/');
    }

    var id = req.session.me;

    User.findOneById(id, function(err, user){
      if(err)  {
        console.log(err);
      }

      return res.view({
        user: user
      });

    });
  }
}

