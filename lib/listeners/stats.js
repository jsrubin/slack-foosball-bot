const stats = require('../actions/actions').stats;

exports.description = '`!stats` - top 20 players';
exports.matcher = /^\!stats$/i;
exports.callback = function (route, message, response) {
	return stats(route, message, response, slackUsers);
};