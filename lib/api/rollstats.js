const games = require('../models/games');
const users = require('../models/users');

const days = 7;

exports.callback = function () {
    const rolling = games.rolling(days);

    const userRankMap = {};
    const rankMap = rolling.map((data) => {

        const winner = data.winner;
    	winner.forEach(function (id) {
            if (!userRankMap[id]) {
                userRankMap[id] = {};
            }

    		const score = userRankMap[id].wins ? (userRankMap[id].wins + 1) : 1;
    		userRankMap[id].wins = score;
    	});

        const loser = data.loser;
        loser.forEach(function (id) {
            if (!userRankMap[id]) {
                userRankMap[id] = {};
            }

            const score = userRankMap[id].losses ? (userRankMap[id].losses + 1) : 1;
            userRankMap[id].losses = score;
        });

    	return; 
    });

    const ranks = [];
    const id = Object.keys(userRankMap);
    id.forEach(function (id) {
        const u = {};
        u.id = id;
        u.wins = userRankMap[id].wins || 0;
        u.losses = userRankMap[id].losses || 0;
        u.total = u.wins + u.losses;
        u.pct = u.losses !== 0 ? (u.wins / u.total) : 1;
        ranks.push(u);
    })

    const rankingMap = {};
    ranks.map((user) => user.pct)
                            .filter((elem, pos, arr) => arr.indexOf(elem) == pos)
                            .map((rankPct, index) => rankingMap[rankPct]=(index+1));

    return ranks.map((user) => 
            ({'id':user.id, 'rank':rankingMap[user.pct], 'pct':users.getRankingsPercentage(ranks, user.wins, user.losses), 'wins':user.wins, 'total':user.total})
            );
};
