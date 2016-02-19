var UserData = require ('./../js/user-data.js');

$(function(){
  var userData = new UserData();
  var repos;

  $('#next-victim').submit(function(event) {
    event.preventDefault();
    var login = $('#next-victim input').val();
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
      var $repoList = $('#repos');
      $repoList.empty();
      repos = userData.setRepoData(data);
      for (var i = 0; i < repos.length; i++) {
        var repoListing = repos[i].name;
        if (repos[i].description) {
          repoListing += '...';
        }
        $repoList.append('<li id="repo-' + i + '">' + repoListing + '</li>');
      }
    });
  });

  $('#repos').on('click', 'li', function() {
    var $this = $(this);
    var clickedRepo = userData.getRepoByIdString($this.attr('id'));
    $this.append('<span class="repo-description"> ' +
                  clickedRepo.description + '</span>');
  });
});
