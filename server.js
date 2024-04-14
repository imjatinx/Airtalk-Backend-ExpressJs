const express = require('express');
const app = express()
const PORT = process.env.PORT || 5000
const { default: mongoose } = require('mongoose');

require('dotenv').config();
app.use(express.json())

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => console.log('Yay! Connection Successful.')).catch(err => console.log('Error connecting DB ==> ', err));
}

const userRouter = require('./routes/userRoutes');

app.get('', (req, res) => {
    res.status(200).json({ message: "Hello User 👋,\n Welcome to our system." })
})

app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server listening on http://127.0.0.1:5000`);
    connectDB()
})