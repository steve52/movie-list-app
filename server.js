const express = require('express'),
  cors = require('cors'),
  app = express(),
  port = process.env.PORT || 9000,
  mongoose = require('mongoose'),
  Movie = require('./models/movieListModel'),
  bodyParser = require('body-parser');

// Create link to Angular build directory
let distDir = __dirname + "/client/build/";
app.use(express.static(distDir));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/MovieListdb');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var routes = require('./routes/movieListRoutes');
routes(app);

app.use(function(req, res, next) {
  res.status(404).send(`${req.originalUrl} not found`);
})

app.listen(port);

console.log(`movie list RESTful API server started on: ${port}`);
