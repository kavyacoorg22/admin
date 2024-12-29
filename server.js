require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const adminRoutes = require('./router/admin');
const connectDB = require('./db/connectDB');
const nocache=require('nocache')
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');
const bodyParser=require('body-parser')


const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON payloads


app.use(nocache())
app.use(cors());

// Static Files
app.use(express.static('public'));

// View Engine and Layouts
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayout);
app.set('layout', './layout/admin-layout.ejs'); // Default layout
app.use(methodOverride('_method'));

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production'? true : false  }, // Secure cookies in production
  })
);

// Routes


app.use('/admin', adminRoutes);

// Connect to Database and Start Server
connectDB()
  .then(() => {
    console.log('Database connection established');
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
