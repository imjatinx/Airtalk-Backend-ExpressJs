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

const loginController = async (req, res) => {
    const { username, password } = req.body;

    // check for all fields
    if (!username || !password) {
        return res.status(400).json({ error: "All fields are required." })
    }

    const user = await UserModel.findOne({ username });
    if (user && user.matchPassword(password)) {
        return res.status(200).json({
            message: "login successful",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            }
            // token: generateToken()
        })
    } else {
        return res.status(400).json({
            error: 'Invalid username or password'
        })
    }
}


const registerController = async (req, res) => {
    const { username, email, password } = req.body;

    // check for all fields
    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required." })
    }

    // check for existing username
    const usernameExist = await UserModel.findOne({ username });
    // console.log(usernameExist);
    if (usernameExist) {
        return res.status(400).json({ error: "Username Already taken." })
    }

    // check for existing email
    const emailExist = await UserModel.findOne({ email });
    if (emailExist) {
        return res.status(400).json({ error: "Email Already exist." })
    }

    const user = await UserModel.create({ username, email, password })
    if (user) {
        return res.status(201).json({
            message: "User Registration Success",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            }
        })
    }
}


module.exports = { userController, loginController, registerController }