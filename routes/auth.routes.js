const controller = require('../controllers/auth.controller');

module.exports = function (app) {
    app.post('/login', controller.login);
    app.post('/register', controller.register);
}