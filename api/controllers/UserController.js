/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
  // to continue...
  login: function(req, res) {
    return res.login({
    }); 
  },

  logout: function(req,res){
    req.session.me = null;
    return res.direct('/'); 
  },

  signup: function(req, res) {
    User.signUp({
      name: req.param('name'), 
      password: req.param('password')
    }, function(err, user){

        if (err) {
          return res.negotiate(err);
        }

        // everything is ok
        req.session.me = user.id;
        return res.ok('signup successfully!');
    })
  }, 
}

