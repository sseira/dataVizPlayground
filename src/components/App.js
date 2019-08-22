import '../assets/stylesheets/base.scss'

import React, { Component } from 'react'
import * as Utility from './Utility.js'
import ndjsonStream from 'can-ndjson-stream'
import VxGraphs from './VxGraphs';
import NivoGraphs from './NivoGraphs';
import SemioticGraphs from './SemioticGraphs'
import TestVX from './testVX';


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
      dataByCountry: []
    };
  }

  componentDidMount() {
    this.getRequestToServer('/getLocalData', this.appendData.bind(this))
  }

  appendData(new_item) {

    // aggregate data here 

    let {dataByCountry} = this.state

    let found = dataByCountry.find((d) => {
      if (new_item.countrycode === d.countrycode) {
        d.key_ids = d.key_ids.concat(new_item.key_id)
        return true
      } 
    })

    if (!found) {
      dataByCountry.push({
        countrycode: new_item.countrycode, 
        key_ids:[new_item.key_id]
      })
    }
    this.setState(state => {
      const data = state.data.concat(new_item)
      return {
        data,
        dataByCountry
      }
    })
  }


  render() {
    const {dataByCountry, data} = this.state
    return (
      <div>
        <VxGraphs
          // data={dataByCountry}
          // drawings={data}
        />

        <TestVX
          width={400}
          height={400}
        />
        {/* <NivoGraphs
          data={dataByCountry}
        />

        <SemioticGraphs
          data={dataByCountry}
        />  */}
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
