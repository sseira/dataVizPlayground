import '../assets/stylesheets/base.scss'

import React, { Component } from 'react'
import * as Utility from './Utility.js'
import ndjsonStream from 'can-ndjson-stream'
import VxGraphs from './VxGraphs';



// import ExampleSVG from '../assets/images/InfoIcon.svg'
//        <ExampleSVG className='' />

// import ExampleJPG from '../assets/images/got.jpg';
//        <img src={ExampleJPG} />

// var MobileDetect = require('mobile-detect'),
//   md = new MobileDetect(navigator.userAgent)
//md.phone() ? do this : do that
/* ---------------------------------------------------- */

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getRequestToServer('/getLocalData', this.appendData.bind(this))
  }

  appendData(new_item) {
    this.setState(state => {
      const data = state.data.concat(new_item)
      return {
        data
      }
    })
  }


  render() {

    return (
      <div>
        <VxGraphs
          data={this.state.data}
        />
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
      .then((response) => {
        return ndjsonStream(response.body); //ndjsonStream parses the response.body
      }).then((exampleStream) => {
        let read;
        let reader = exampleStream.getReader()
        reader.read().then(read = (result) => {
          if (result.done) return;
          callback(result.value)
          reader.read().then(read); //recurse through the stream
        });
      });
  }

};

export default App;
