const bcrypt = require('bcrypt')
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

userModel.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userModel.pre('save', async function (next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})


const User = mongoose.model("User", userModel);
module.exports = User;