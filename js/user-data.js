function UserData() {
}

UserData.prototype.setRawData = function (data) {
  this.rawData = data;
  return this.rawData;
};

UserData.prototype.getUserName = function () {
  if (this.rawData.name) {
    return this.rawData.name + ' (' + this.rawData.login + ')';
  } else {
    return this.rawData.login;
  }
};

UserData.prototype.getStartEndDates = function () {
  var startDate = moment(this.rawData.created_at);
  var endDate = moment(this.rawData.updated_at);
  var dateFormat = 'MMMM Do YYYY';
  return startDate.format(dateFormat) + ' - ' + endDate.format(dateFormat);
};

UserData.prototype.setRepoData = function (data) {
  this.repoData = data;
  return this.repoData;
};

module.exports = UserData;

// EXAMPLE DATA:
// avatar_url: "https://avatars.githubusercontent.com/u/439365?v=3"
// bio: null
// blog: "https://daneden.me"
// company: "Dropbox"
// created_at: "2010-10-14T13:35:34Z"
// email: "dan.eden@me.com"
// events_url: "https://api.github.com/users/daneden/events{/privacy}"
// followers: 2484
// followers_url: "https://api.github.com/users/daneden/followers"
// following: 80
// following_url: "https://api.github.com/users/daneden/following{/other_user}"
// gists_url: "https://api.github.com/users/daneden/gists{/gist_id}"
// gravatar_id: ""
// hireable: null
// html_url: "https://github.com/daneden"
// id: 439365
// location: "San Francisco, CA"
// login: "daneden"
// name: "Daniel Eden"
// organizations_url: "https://api.github.com/users/daneden/orgs"
// public_gists: 141
// public_repos: 31
// received_events_url: "https://api.github.com/users/daneden/received_events"
// repos_url: "https://api.github.com/users/daneden/repos"
// site_admin: false
// starred_url: "https://api.github.com/users/daneden/starred{/owner}{/repo}"
// subscriptions_url: "https://api.github.com/users/daneden/subscriptions"
// type: "User"
// updated_at: "2016-02-16T05:37:09Z"
// url: "https://api.github.com/users/daneden"
