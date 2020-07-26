const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z]{2,6})$/]
        },
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
        friends: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
            
        },
        id: false
    }
);
//Create User Model using UserSchema
const User = model('User', UserSchema);

//Virtual for FriendCount, length of friends array
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

module.exports = User;