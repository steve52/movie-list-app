const express = require('express'),
  cors = require('cors'),
  app = express(),
  port = process.env.PORT || 9000,
  mongoose = require('mongoose'),
  Movie = require('./api/models/movieListModel'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MovieListdb');

// app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var routes = require('./api/routes/movieListRoutes');
routes(app);

app.use(function(req, res, next) {
  res.status(404).send(`${req.originalUrl} not found`);
})

app.listen(port);

console.log(`movie list RESTful API server started on: ${port}`);
