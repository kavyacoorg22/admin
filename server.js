require('dotenv').config();
const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const adminRoutes=require('./router/admin')
const connectDB=require('./db/connectDB')
const port = process.env.PORT || 3000;

// Middleware to parse JSON request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/js', express.static(__dirname + '/public/js'));

// Setting Views Folder and View Engine
app.set('views', './views');
app.use(expressLayout);
app.set('layout', './layout/admin-layout.ejs'); // Default layout for all views
app.set('view engine', 'ejs');

// Routes
app.use('/admin',adminRoutes)


//connect databse before listening on to the port
connectDB()
.then(()=>
{
  console.log("Database connection established")
  // Start the Server
  app.listen(port, () => console.log(`Server running properly on http://localhost:${port}`));
})
.catch(()=>
{
  console.log('Database connection failed')
})

