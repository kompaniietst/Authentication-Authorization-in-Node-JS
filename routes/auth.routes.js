const controller = require('../controllers/auth.controller');
const authenticate = require('../middleware/authenticate');
const User = require('../model/user');


module.exports = function (app) {
    app.post('/login', controller.login);
    app.post('/register', controller.register);

    app.post("/welcome", authenticate, async (req, res) => {
        console.log(req.user.email);
        const user = await User.findOne({ email: req.user.email });
        console.log('U', user);
        res.status(200).send(user);
    });

    app.get("/current-user", authenticate, controller.getCurrentUser);
}