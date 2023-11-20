const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {

    },
    rectionBody: {
        type: String, 
        required: true,
        maxLength: 280
    },
    username: {
        type: String, 
        required: true, 
    },
    createdAt: {
        type: Date, 
        default: Date.now,
        // get: // Use a getter method to format the timestamp on query
    }
})

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String, 
        unique: true, 
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date, 
        default: Date.now,
        // get: // Use a getter method to format the timestamp on query
    },
    username: {

    },
    reactions: [reactionSchema]
})

const Thought = mongoose.model('Thought',thoughtSchema);

module.exports = Thought;

