var UserData = require ('./../js/user-data.js');

$(function(){
  var userData = new UserData();
  var repositories;

  $('#next-victim').submit(function(event) {
    event.preventDefault();
    login = $('#next-victim input').val();
    $('#next-victim input').val('');

    var apiUserRequest = 'https://api.github.com/users/' + login;
    $.get(apiUserRequest, function(data) {
      userData.setRawData(data);
      $('#user-name').text(userData.getUserName());
      $('#dates').text(userData.getStartEndDates());
      $('#victim-info').show();
    });

    var apiRepoRequest = apiUserRequest + '/repos';
    $.get(apiRepoRequest, function(data) {
      var $repositoryList = $('#repositories');
      repositories = userData.setRepoData(data);
      for (var i = 0; i < repositories.length; i++) {
        $repositoryList.append('<li id="repo-' + i + '">' +
                                repositories[i].name + '</li>');
      }
    });
  });
});
