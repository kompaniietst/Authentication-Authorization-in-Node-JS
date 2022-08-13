const controller = require('../controllers/words.controller');
const authenticate = require('../middleware/authenticate');

module.exports = function (app) {
    app.post('/create-word', controller.createWord);
    app.post('/words', authenticate, controller.getWords);
}