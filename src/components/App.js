import '../assets/stylesheets/base.scss'

import React, { Component } from 'react'
import * as Utility from './Utility.js'

// import ExampleSVG from '../assets/images/InfoIcon.svg'
//        <ExampleSVG className='' />

// import ExampleJPG from '../assets/images/got.jpg';
//        <img src={ExampleJPG} />

// var MobileDetect = require('mobile-detect'),
//   md = new MobileDetect(navigator.userAgent)
//md.phone() ? do this : do that
/* ---------------------------------------------------- */

class App extends Component {

  componentWillMount() {
  
  }

  componentDidMount() {

  }


  render() {

    return (
      <div>
      Build Awesome Things, <br/> I mean Hello World ;)

      </div> 
    
    )
  }



  /* --------------- Networking Methods --------------- */

  /*
  Example calls:
    this.getRequestToServer('/getLocalData', this.callback.bind(this))
  */
  getRequestToServer(path, callback) {
    fetch(path)
      .then(function (response) {
        return response.json()
      }, function (error) { console.log('error- ' + error) })
      .then(function (data) {
        if (data) {
          callback(data)
        } else {
          console.log('didnt get any data')
        }
      })
  }

};

export default App;
