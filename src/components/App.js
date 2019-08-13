import '../assets/stylesheets/base.scss'

import React, { Component } from 'react'
import * as Utility from './Utility.js'
import ndjsonStream from 'can-ndjson-stream'


import { curveNatural } from '@vx/curve'
import { LinePath } from '@vx/shape'
import { scaleLinear, scaleTime } from '@vx/scale'
import { max } from 'd3-array'


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

    console.log('did mount')
    this.getRequestToServer('/getLocalData', this.appendData.bind(this))
  }

  appendData(new_item) {
    console.log('callback')
    console.log('client - ', new_item)
    this.setState(state => {
      const data = state.data.concat(new_item)
      return {
        data
      }
    })
  }

  prettifyPath(drawingPath) {
    let prettyPath = []
    drawingPath[0].forEach((element, i)=> {
      let point = {
        x: element,
        y: drawingPath[1][i]
      }
      prettyPath.push(point)
    });
    console.log(prettyPath)

    return prettyPath
  }

  getYScale(data, y, yMax) {
    return scaleLinear({
      domain: [0, max(data, y)],
      range: [0, yMax]
    })
  }

  getXScale(data, x, xMax){
    return scaleLinear({
      domain: [0, max(data, x)],
      range: [0, xMax]
    })
  }


  drawShape(shape) {
    let width = 265,
        height = 265,
        margin = {top: 10, left: 10},
        color = '#000'


    return (
      <svg width={width} height={height}>
        <g top={margin.top} left={margin.left}>
        {shape.drawing.map((path, i) => {

          const x = d => d.x
          const y = d => d.y
          let prettyPath = this.prettifyPath(path)

          return (
            <LinePath
              key={i}
              data={prettyPath}
              xScale={this.getXScale}
              yScale={this.getYScale}
              x={x}
              y={y}
              curve={curveNatural}
              stroke={color}
              strokeLinecap="round"
            />
          )

          })}
        </g>
      </svg>

    )
  }

  render() {

    return (
      <div>
      Build Awesome Things, <br/> I mean Hello World ;)
      {this.state.data.map(item => (
        <div key={item.timestamp}>
        {this.drawShape(item)}
        </div>
      ))}
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
          // console.log(result.value);
          callback(result.value)
          reader.read().then(read); //recurse through the stream
        });
      });
  }

};

export default App;
