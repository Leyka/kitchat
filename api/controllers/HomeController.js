/**
 * HomeController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  
  index: function(req, res) {
    console.log('Home');
    res.view('index'); 
  }

  
};

