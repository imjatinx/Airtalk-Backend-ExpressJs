const mongoose = require('mongoose');


const userModel = mongoose.Schema(
    {
        username: { type: String },
        email: { type: String },
        password: { type: String }
    },
    {
        timestamp: true
    }
)


const User = mongoose.model("User", userModel);
module.exports = User;