const Word = require('../model/word');
const buildTree = require('../middleware/buildSystemTree');

exports.createWord = async (req, res) => {
    const { word, translate, transcription, list_id } = req.body;
    console.log(req.body);

    if (!word || !list_id) {
        res.status(400).send("All inputs are required");
        return;
    }

    const newWord = await Word.create({
        word,
        translate,
        transcription,
        createdAt: Date.now(),
        list_id: list_id
    });
    console.log('newWord', newWord);

    res.status(200).send(newWord);
}

exports.getWords = async (req, res) => {
    const { list_id } = req.body;

    const allWords = await Word.find({ list_id: list_id })

    res.status(200).send(allWords);
}