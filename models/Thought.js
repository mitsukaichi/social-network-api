const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new ObjectId,
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
        get: formatDate
    }
})

const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String, 
            unique: true, 
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: formatDate
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

function formatDate(date) {
    return date.toLocaleDateString();
};

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = mongoose.model('thought',thoughtSchema);

module.exports = Thought;

