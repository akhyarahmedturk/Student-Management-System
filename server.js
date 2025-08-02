require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
// const verify_jwt = require('./middleware/verify_JWT');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connect_DB = require('./config/dbConnect');

connect_DB();


const PORT = process.env.PORT || 3500;

app.use(cors({
    origin: 'https://your-frontend.vercel.app', // or "*" for dev/testing
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));


app.use(express.json());

app.use(cookieParser());


app.use('/students', require('./routes/studentsRoutes'));

app.use('/', require('./routes/root'));

app.use(express.static(path.join(__dirname, '/public')));

app.all(/^.*$/, (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'views', '404.html'));

});


mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});