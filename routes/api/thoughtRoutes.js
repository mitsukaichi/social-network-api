const router = require('express').Router();
const { User, Thought } = require('../../models');
const { ObjectId } = require('mongodb');

// GET to get all thoughts
router.get('/', async (req,res) => {
    try {
        const result = await Thought.find({});
        res.status(200).send(result);
    } catch(err) {
        res.status(500).send(err);
    }
})

// GET to get a single thought by its _id
router.get('/:id', async (req,res) => {
    try {
        const result = await Thought.findOne({ _id : new ObjectId(req.params.id) });
        if (!result) {
            return res.status(404).json({ message: `No user was found with this id`})
        } else {
            res.status(200).send(result)
        }
    } catch(err) {
        res.status(500).send(err);
    }
})

// POST to create a new thought 
// (don't forget to push the created thought's _id to the associated user's thoughts array field)
router.post('/', async (req,res) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id : new ObjectId(req.body.userId) },
            { $addToSet: { thoughts: thought._id.toString()}},
            { new: true}
        );

        if (!thought || !user) {
            res.status(404).json({ message: `Failed to create a new post for this user. Please try again`})
        }
        res.status(200).json({ message: `New thought was successfully posted`})
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
})

// PUT to update a thought by its _id
router.put('/:id', async (req,res) => {
    try {
        const result = await Thought.findOneAndUpdate(
            { _id: new ObjectId(req.params.id)},
            { $set: req.body },
            { runValidators: true, new: true}
        );
        if (!result) {
            return res.status(404).json({ message: `No thought was found with this id`})
        } else {
            res.status(200).send(result)
        }
    } catch(err) {
        res.status(500).send(err);
    }
})

// DELETE to remove a thought by its _id
router.delete('/:id', async (req, res) => {
    try {
        const deleteThought = await Thought.findOneAndRemove({ _id: new ObjectId(req.params.id) });
        if (!deleteThought) {
            return res.status(404).json({ message: `No thought was found with this id`})
        }
        await User.findOneAndUpdate(
            { username : deleteThought.username },
            { $pull: { thoughts: req.params.id }},
            { new: true}
        );
        res.status(200).send(deleteThought)
    } catch(err){
        res.status(500).send(err);
    }
})

// /api/thoughts/:thoughtId/reactions
// POST to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const newReaction = await Thought.findOneAndUpdate(
            { _id : new ObjectId(req.params.thoughtId) },
            { $push: { reactions: req.body }},
            { runValidators: true, new: true}
        );
        if(!newReaction) {
            res.status(404).json({message: `Couldn't add as new reaction. Make sure both IDs are correct`})
        }
        res.status(200).send(newReaction);
    } catch(err){
        res.status(500).send(err);
    }
})

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions', async (req, res) => {
    try {
        const deleteReaction = await Thought.findOneAndUpdate(
            { _id : new ObjectId(req.params.thoughtId) },
            { $pull: {
                reactions: { reactionId: new ObjectId(req.body.reactionId )}
                }
            }
        );
        if(!deleteReaction) {
            res.status(404).json({message: `Couldn't delete the reaction. Make sure the ID is correct`})
        }
        res.status(200).send(deleteReaction);
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
})

module.exports = router;