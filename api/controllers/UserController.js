/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcrypt');

module.exports = {
	
  // Login
  login: function(req, res) {
    console.log(req.body);

    if (!req.body) {
      return res.redirect('/'); 
    }

    User.findOneByName(req.body.name, function(err, user){

      if (err) 
        res.json({ error: 'DB error' }, 500);

      if (user) {
        bcrypt.compare(req.body.password, user.password, function (err, match) {

          if (err) 
            res.json({ error: 'Server error' }, 500);

          // password match
          if (match) {
            req.session.user = user.id;
            res.json(user);
          } 
          // invalid password
          else {
            if (req.session.user) 
              req.session.user = null;

            res.json({ error: 'Invalid password' }, 400);
          }
        });
      } else {
        res.json({ error: 'User not found' }, 404);
      }
    }); 
  }

}

