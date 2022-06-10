const controller = require('../controllers/system-entities.controller');
const authenticate = require('../middleware/authenticate');
const User = require('../model/user');


module.exports = function (app) {
    app.post('/create-entity', authenticate, controller.createEntity);
    app.post('/entities', authenticate, controller.getEntities);
}