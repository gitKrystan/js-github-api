var UserData = require ('./../js/user-data.js');

$(function(){
  var userData = new UserData();
  var repos;

  $('#next-victim').submit(function(event) {
    event.preventDefault();
    var login = $('#next-victim input').val();
    $('#next-victim input').val('');

    var apiUserRequest = 'https://api.github.com/users/' + login;
    getUserRequestAndUpdateUserData(apiUserRequest, userData);

    var apiRepoRequest = apiUserRequest + '/repos';
    getRepoRequestAndUpdateUserData(apiRepoRequest, userData);
  });
});

var getUserRequestAndUpdateUserData = function(apiUserRequest, userData) {
  $.get(apiUserRequest, function(data) {
    userData.setRawData(data);
    $('#user-name').text(userData.getUserName());
    $('#dates').text(userData.getStartEndDates());
    $('#victim-info').show();
  });
};

var getRepoRequestAndUpdateUserData = function(apiRepoRequest, userData) {
  $.get(apiRepoRequest, function(data) {
    var $repoList = $('#repos');
    $repoList.empty();
    repos = userData.setRepoData(data);
    for (var i = 0; i < repos.length; i++) {
      generateRepoListing(repos[i]);
    }
  });
};

var generateRepoListing = function(repo) {
  var repoListing = repo.name;
  if (repo.description) {
    repoListing += '...';
  }
  $repoList.append(
    '<li>' +
      '<a role="button" data-toggle="collapse"href="#repo-' + i + '">' +
        repoListing +
      '</a>' +
      '<div id="repo-' + i + '" class="collapse"> ' +
        '<div id="repo-description">' +
          repo.description +
        '</div>' +
      '</div>' +
    '</li>');
};
