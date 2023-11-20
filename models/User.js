const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    thoughts: {

    },
    friends: {

    }
})

const User = mongoose.model('User',userSchema);

module.exports = User;