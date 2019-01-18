# movie-list-app

## Getting Started
This project was intended to give me and my girlfriend a way to collaborate on a list of movies that we want to watch together to help us when trying to choose a movie to watch at home.
### Notes
This repo combines and express server and a react app. The react app was originally made using [create-react-app](https://github.com/facebook/create-react-app) and has been ejected so that I could modify the configs.
### Prerequisites
mongoDB, node, npm

### Installation
```
npm install
```

### Running in development
```
npm run dev
```
This will start the api server on port 9000 and the client on port 3000.

### Running in production
Build the static files for the react app and start the server which will provide the api endpoints and serve the app.
```
npm run start
```
### To deploy to heroku
If you have a Heroku account, deploying to the web is pretty simple. Here are some good instructions on that: https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app