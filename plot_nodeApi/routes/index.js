const express = require("express");
const cors = require("cors");
var morgan = require("morgan");
require("dotenv").config();
const userRoute = require('./userRoutes')
const userTypeRoute = require('./userTypeRoutes')
const siteContentRoute = require('./siteManageRoutes');
const categoryRoute = require('./categoryRoutes');
const listingRoute = require('./listingRoutes');
const graph = require('./graphRoutes');
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));
app.use('/plotlist',userTypeRoute);
app.use('/plotlist',userRoute);
app.use('/plotlist',siteContentRoute);
app.use('/plotlist',categoryRoute);
app.use('/plotlist',listingRoute);
app.use('/plotlist',graph);

module.exports = app;
