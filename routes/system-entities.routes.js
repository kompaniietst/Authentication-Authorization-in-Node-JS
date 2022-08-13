const controller = require('../controllers/system-entities.controller');
const authenticate = require('../middleware/authenticate');

module.exports = function (app) {
    app.post('/create-entity', authenticate, controller.createEntity);
    app.get('/entities', authenticate, controller.getEntities);
    app.delete('/clearDB', controller.clearDB);
}