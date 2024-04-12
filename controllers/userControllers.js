const UserModel = require("../models/userModels")

const userController = {
    createUser: (req, res) => {
        res.json('Create User')
    },
    getAllUser: (req, res) => {
        res.json('All Users')
    },
    getUserById: (req, res) => {
        res.json('Users By Id')
    },
    updateUser: (req, res) => {
        res.json('Users Update')
    },
    deleteUser: (req, res) => {
        res.json('Users delete')
    }
}

const loginController = (req, res) => {
}


const registerController = (req, res) => {
    const { username, email, password } = req.body;

    
    // check for all fields
    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required." })
    }
    
    // check for existing username
    const usernameExist = UserModel.findOne({ username });
    console.log(usernameExist);
    if (usernameExist) {
        return res.status(400).json({ error: "Username Already taken." })
    }

    // check for existing user
    const userExist = UserModel.findOne({ email });
    if (userExist) {
        return res.status(400).json({ error: "User Already exist." })
    }

    const user = UserModel.create({ username, email, password })
}


module.exports = { userController, loginController, registerController }