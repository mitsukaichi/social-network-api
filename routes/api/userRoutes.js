const router = require('express').Router();
const { User, Thought } = require('../../models');
const { ObjectId } = require('mongodb');

// GET all users
router.get('/', async (req,res) => {
    try {
        const result = await User.find({});
        res.status(200).send(result);
    } catch(err) {
        res.status(500).send(err);
    }
})

// GET a single user by its _id and populated thought and friend data
router.get('/:id', async (req,res) => {
    try {
        const result = await User.findOne({ _id : new ObjectId(req.params.id) });
        if (!result) {
            return res.status(404).json({ message: `No user was found with this id`})
        } else {
            res.status(200).send(result)
        }
    } catch(err) {
        res.status(500).send(err);
    }
})

// POST a new user
router.post('/', async (req,res) => {
    try {
        const result = await User.create(req.body);
        res.status(200).send(result);
    } catch(err) {
        res.status(500).send(err);
    }
})

// PUT to update a user by its _id
router.put('/:id', async (req,res) => {
    try {
        const result = await User.findOneAndUpdate(
            { _id: new ObjectId(req.params.id)},
            { $set: req.body},
            { runValidators: true, new: true}
        );
        if (!result) {
            return res.status(404).json({ message: `No user was found with this id`})
        } else {
            res.status(200).send(result)
        }
    } catch(err) {
        res.status(500).send(err);
    }
})

// DELETE to remove user by its _id
// BONUS: Remove a user's associated thoughts when deleted.
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findOneAndRemove({ _id: new ObjectId(req.params.id) });
        if (!deletedUser) {
            return res.status(404).json({ message: `No user was found with this id`})
        }
        // Remove a user's associated thoughts
        // Get the list of thoughts returned from the previous request and delete those IDs from Thoughts
        const deletedThoughts = await Thought.deleteMany({ _id: { $in: deletedUser.thoughts}});
        if (deletedThoughts) {
            res.status(200).send({message: `User and the thoughts by this user were deleted.`})
        } else {
            res.status(200).json({message: `User was deleted. This user didn't have any thoughts`})
        }
    } catch(err){
        res.status(500).send(err);
    }
})


// /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list
router.post('/:id/friends/:friendId', async (req, res) => {
    try {
        const newFriend = await User.findOneAndUpdate(
            { _id : new ObjectId(req.params.id) },
            { $addToSet: { friends: new ObjectId(req.params.friendId) }},
            { new: true}
        );
        if(!newFriend) {
            res.status(404).json({message: `Couldn't add as new friend. Make sure both IDs are correct`})
        }
        res.status(200).send(newFriend);
    } catch(err){
        res.status(500).send(err);
    }
})

// DELETE to remove a friend from a user's friend list

router.delete('/:id/friends/:friendId', async (req, res) => {
    try {
        const newFriend = await User.findOneAndUpdate(
            { _id : new ObjectId(req.params.id) },
            { $pull: { friends: new ObjectId(req.params.friendId) }},
            { new: true}
        );
        console.log(newFriend);
        if(!newFriend) {
            res.status(404).json({message: `Couldn't delete friend. Make sure both IDs are correct`})
        }
        res.status(200).send(newFriend);
    } catch(err){
        res.status(500).send(err);
    }
})
module.exports = router;