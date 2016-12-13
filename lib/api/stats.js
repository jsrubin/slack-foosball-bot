const users = require('../models/users');

exports.callback = function () {
	const rankings = users.rank().reverse().slice(0, 20);
	return rankings.map((user, index) => ({'id':user.id, 'rank':(index + 1), 'pct':users.getWeightedRankingsPercentage(user.id)}));
};