# React + Node.js Starter Pack


## File Structure


### Client Side Components(/src/components)

- App.js 
  * **Primary/Parent React Component**

- Utility.js 
  * **Helper functions and constants**


### Server Side
- server.js 
  * simple node.js server that reads in data from /data directory
	
- auth.js
  * handles authentication requirements (username/password)


### UP & RUNNING
* `npm install`
* `nodemon ./server.js localhost 8080` -- or -- `npm start`
* visit `http://localhost:8080/`


### DEPLOYING TO HEROKU
This app is set up for deployment to Heroku!

Heroku will follow the `postinstall` command in your `package.json` and compile assets with `webpack.prod.config.js`. It runs the Express web server in `server.js`. You'll notice there's a special section set up for running in development.
