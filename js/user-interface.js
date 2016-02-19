var UserData = require ('./../js/user-data.js');

$(function(){
  var userData;
  $.get('https://api.github.com/users/daneden', function(data) {
    userData = new UserData(data);
    $('#user-name').text(userData.getUserName());
  });
});
