/*---------------  Express Server Setup  ----------------*/
var path = require('path');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080
var fs = require('fs');
var https = require('https');
var http = require('http');
var ndjson = require('ndjson')


/* ----- Password Protection ------ */
// const auth = require('./auth');
// app.use(auth);


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html')
});


app.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});


/*--------------- ^^^ Express Server Setup ^^^ ----------------*/


/* --------------- TODO: Call Remote APIs ---------------- */




/* --------------- Load Local JSON ---------------- */

app.get('/getLocalData', function(request, response) {
  var chunks = []

  fs.createReadStream('data/frog_small.ndjson')
  .pipe(ndjson.parse())
  .on('data', function(data) {
    // readStream.pipe(res);
    chunks.push(JSON.stringify(data))
    // console.log(data)
  })
  .on('end', () => {

    // not sure why we need the SetInterval...
    const id = setInterval( () => {
      if ( chunks.length ) {
        response.write( chunks.shift() + "\n" );
      } else {
        clearInterval( id );
        response.end();
      }
    }, 0 );
  })

})