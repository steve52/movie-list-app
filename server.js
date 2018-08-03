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
let promise = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/MovieListdb', {
  useMongoClient: true
});

promise.then(() => {
  console.log('Connected to mongodb');

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  let routes = require('./routes/movieListRoutes');
  routes(app);

  app.use(function(req, res, next) {
    res.status(404).send(`${req.originalUrl} not found`);
  })

  app.listen(port);

  console.log(`movie list RESTful API server started on: ${port}`);
}, (err) => {
  console.error('Failed to connect to mongodb', err);
});


