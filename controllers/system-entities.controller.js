const Entity = require('../model/entity');
const buildTree = require('../middleware/buildSystemTree');

exports.createEntity = async (req, res) => {
    const { name, type, path } = req.body;
    const { user_id: author } = req.user;

    if (!type || !name) {
        res.status(400).send("All inputs are required");
        return;
    }

    const entity = await Entity.create({
        name,
        type,
        path,
        createdAt: Date.now(),
        author: author
    });

    res.status(200).send(entity);
}

exports.getEntities = async (req, res) => {
    const { user_id: author } = req.user;
    //TODO validation
    const allEntities = await Entity.find({ author: author })

    const entitiesTree = buildTree(allEntities);

    res.status(200).send(entitiesTree);
}

exports.clearDB = async (req, res) => {
    await Entity.remove();

    res.status(200).send("db is clean");
}