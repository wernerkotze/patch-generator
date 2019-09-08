const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// get posts 
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// add posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send()
})

// delete posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send()
})

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://werner:S9q2moGW051Zis9O@vue-express-3wz6l.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })

    return client.db('vue-express').collection('posts')
}

module.exports = router;
