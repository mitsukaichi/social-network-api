const router = require('express').Router();
const { User, Thought } = require('../../models');

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
            { username : req.body.username },
            { $addToSet: { thoughts: new ObjectId(thought._id) }},
            { new: true}
        );

        if (!thought || !user) {
            res.status(404).json({ message: `Failed to create a new post for this user. Please try again`})
        }
        res.status(200).json({ message: `New thought was successfully posted`})
    } catch(err) {
        res.status(500).send(err);
    }
})


// PUT to update a thought by its _id

// DELETE to remove a thought by its _id

// /api/thoughts/:thoughtId/reactions
// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value
