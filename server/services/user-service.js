const fs = require('fs');
const _ = require('lodash');
const config = require('config');
const userList = config.get('userListPath');

let users = [];

const initialize = function () {
    let data = fs.readFileSync(userList);
    data = JSON.parse(data);
    users = data.users;
}();

exports.find = function (username, password) {
    return _.find(users, (u) => {
        return u.username === username && u.password === password;
    });
};