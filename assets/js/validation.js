$(document).ready(function(){

  // Validation
  $('#btnSignup').click(function(){
    var name = $('#name').val(); 
    var pw = $('#password').val(); 
    var re_pw = $('#re-password').val(); 

    if (!name && !pw) {
      showError('Name and password required'); 
      return false;
    }
    else if (!name) {
      showError('Name required'); 
      return false;
    }
    else if (!pw) {
      showError('Password required'); 
      return false;
    }
    else if (pw.length < 6) {
      showError('Your password must be at least 6 caracters'); 
      return false;
    }
    else if(!re_pw) {
      showError('Just confirm your password!'); 
      return false;
    }

    var pw = $('#password').val(); 
    var re_pw = $('#re-password').val(); 

    if(! passwordIsValid(pw, re_pw)) {
      showError('Your password dosen\'t match :('); 
      return false;
    }
    
  });

  $('#frmSignup').on('change', '#password', function(){
    var pw = $(this).val(); 

    if (pw.length < 6) {
      showError('Your password must be at least 6 caracters'); 
    } 
    else{
      removeError(); 
    }
  }); 

});

function passwordIsValid(pw, re_pw) {
  var is_valid = false;

  if (pw && re_pw && pw == re_pw) {
    is_valid = true;
  }

  return is_valid;
}

function showError(msg) {
  var error = $('.grpError'); 
  error.find('.error').removeClass('hide'); 
  error.find('span').text(msg); 
}

function removeError() {
  $('.grpError').find('.error').addClass('hide');
}