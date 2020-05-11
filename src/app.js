const path = require('path');
const express = require('express');
const hbs = require('hbs');

const routes = require('./routes');

const app = express();

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views');
const publicPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath))
app.use('/', routes)



app.listen(3000)