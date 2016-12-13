const users = require('../models/users');
const async = require('async');
const _ = require('lodash');

exports.stats = function (route, message, response, webUsers) {
  const rankings = users.rank().reverse().slice(0, 20);

  async.parallel(rankings.map(user => callback => webUsers.info(user.id, callback)), (error, result) => {
    if (error) {
      return console.log(error);
    }

    const userMap =_.chain(result).map(data => [data.user.id, data.user.real_name || data.user.name]).object().value()
    response(rankings.map((user, index) => `${index + 1}) ${userMap[user.id]} (${users.getRankingForPretty(user.id)}%)`).join('\n'))
    return;
  });
};