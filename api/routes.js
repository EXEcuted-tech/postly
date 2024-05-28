require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');

//Routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const fileRoutes = require('./routes/fileRoutes')
const followRoutes = require('./routes/followRoutes')
const notifRoutes = require('./routes/notifRoutes')
const postRoutes = require('./routes/postRoutes')
const reactRoutes = require('./routes/reactRoutes')
const forgotpassRoutes = require('./routes/fogtopassRoutes')

app.use(cors({
    origin: [process.env.CORS_ORIGIN],
    methods: ["GET","POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const allowedOrigins = [process.env.CORS_ORIGIN];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(express.json());
app.use('/',authRoutes);
app.use('/user',userRoutes);
app.use('/file',fileRoutes)
app.use('/follow',followRoutes);
app.use('/notif',notifRoutes);
app.use('/post',postRoutes);
// app.use('/react',reactRoutes);
app.use('/forgotpass', forgotpassRoutes)

module.exports = app;