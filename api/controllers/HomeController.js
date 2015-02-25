/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function(req, res) {
    // already connected
    if(req.session.me) {
      res.redirect('/me');
    } 
    else {
      res.view('user/login'); 
    }

  }
}