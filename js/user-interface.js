var UserData = require ('./../js/user-data.js');

$(function(){
  var userData;

  $('#next-victim').submit(function(event) {
    event.preventDefault();
    login = $('#next-victim input').val();
    $('#next-victim input').val('');

    var apiRequest = 'https://api.github.com/users/' + login;
    $.get(apiRequest, function(data) {
      userData = new UserData(data);
      $('#user-name').text(userData.getUserName());
    });
  });
});
