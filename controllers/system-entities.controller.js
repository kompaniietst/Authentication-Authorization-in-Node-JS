const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const Entity = require('../model/entity');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            res.status(400).send("allinput required!");
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send("User doesn't exist");
        }

        const userValid = bcrypt.compare(password, user.password);

        if (user && userValid) {
            const token = jwt.sign(
                { user_id: user.id, email },
                process.env.TOKEN_KEY,
                { expiresIn: '2h' }
            );
            user.token = token;
            res.status(200).json(user);
        }

        res.status(400).send("Invalid Credentials");
    }
    catch (err) {
        console.log(err);
    }

}

exports.register = async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body;

        if (!(email && password && fname && lname)) {
            res.status(400).send("All inputs are required");
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fname,
            lname,
            email: email.toLowerCase(),
            password: encryptedPassword
        });

        const token = jwt.sign(
            { user_id: user.id, email },
            process.env.TOKEN_KEY,
            { expiresIn: '2h' }
        );

        await User.updateOne(
            { email: user.email },
            { token: token }
        );

        res.status(201).json({ ...user, token });
    }
    catch (err) {
        console.log(err);
    }
}

exports.createEntity = async (req, res) => {
    const { type, name } = req.body;
    const { user_id: author } = req.user;

    if (!type || !name) {
        res.status(400).send("All inputs are required");
        return;
    }

    const entity = await Entity.create({
        type,
        name,
        createdAt: Date.now(),
        author: author
    });

    res.status(200).send(entity);
}

exports.getEntities = async (req, res) => {
    const { user_id: author } = req.user;
    //TODO validation
    const entities = await Entity.find({ author: author })
    res.status(200).send(entities);
}