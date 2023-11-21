const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            unique: true, 
            required: true, 
            trim: true
        },
        email: { 
            type: String, 
            unique: true, 
            required: true, 
            validate: {
                validator: function(email) {
                    return /^([a-z0-9_\.-]+)@([a-z0-9\.-]+)\.([a-z\.]{2,6})$/.test(email);
                },
                message: "This is not a valid email address"
            }
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = mongoose.model('user',userSchema);

module.exports = User;