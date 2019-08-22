import React, { Component } from 'react'

import { curveNatural } from '@vx/curve'
import { LinePath, Bar, Line } from '@vx/shape'
import { scaleLinear, scaleBand, scaleOrdinal, scaleTime } from '@vx/scale'
import { Group } from '@vx/group';
import { withTooltip, Tooltip } from "@vx/tooltip";
import { localPoint } from "@vx/event";
import { Zoom } from '@vx/zoom';


import { cityTemperature, appleStock } from "@vx/mock-data";


import { schemeSet1 } from 'd3-scale-chromatic';
import { max, extent, bisector } from 'd3-array'
import { formatWithOptions } from 'util';


/* ------- Layout Constants ------- */
const backgroundColor = "#32deaa",
      width = 600,
      height = 400,
      padding = 50,
      xMax = width - padding,
      yMax = height - padding,
      color1 = 'black',
      color2 = 'gray',
      data = cityTemperature.slice(0,100)



const initialTransform = {
      scaleX: 1.27,
      scaleY: 1.27,
      translateX: -211.62,
      translateY: 162.59,
      skewX: 0,
      skewY: 0
    };


/* ------- Data Accessors ------- */
const selectNumStrokes = d => d.drawing.length,
      selectID = d => d.key_id,
      selectCountry = d =>d.countrycode,
      selectNumDrawings = d => d.key_ids.length,
      selectDate = (d) => {
        if (d) {
          return new Date(d.date.slice(0,4),d.date.slice(4,6),d.date.slice(6,8))
        } else {
          console.log(d)
          return null
        }
      }, 
      selectTemperature_NY = d => d['New York'],
      selectTemperature_SF = d => d['San Francisco'],
      selectTemperature_AU = d => d.close //['Austin']

     
    


/* ------ Scales ------- */

const dateScale = scaleTime({
  range: [padding, xMax],
  domain: extent(data, selectDate) 
})

const temperatureSFScale = scaleLinear({
  range: [yMax, padding],
  domain: [0, max(data, selectTemperature_SF)]
})

// const getYScale = scaleLinear({
//   range: [0, yMax],
//   domain: [0, max(data, selectNumDrawings)]
// })

// const getXScale = scaleLinear({
//   range: [0, xMax],
//   domain: [0, max(data, selectCountry)]
// })

// const getNumStrokesScaleX = scaleBand({
//   range: [0,xMax], 
//   domain: data.map(selectCountry),
//   padding: 0.4
// })

// const scaleForColors = scaleOrdinal({
//   range: schemeSet1, 
//   domain: data.map(selectCountry)
// })

// const getNumStrokesScaleY = scaleLinear({
//   range: [0, yMax],
//   domain: [0, max(data, selectNumDrawings)]
// })





/* ---------------------------------------------------- */
/* ---------------------------------------------------- */
// Component BEGINS
/* ---------------------------------------------------- */


class VxGraphs extends Component {

  constructor(props) {
    super(props);
    this.handleDrag = this.handleDrag.bind(this);
    this.finishDrag = this.finishDrag.bind(this);

    console.log('constructor')
    this.state = {
      position: null,
  };
  }



/* ------- Data Processing ------- */
  prettifyPath(drawingPath) {
    let prettyPath = []
    drawingPath[0].forEach((element, i)=> {
      let point = {
        x: element,
        y: drawingPath[1][i]
      }
      prettyPath.push(point)
    });

    return prettyPath
  }


  /* ------- Scales ------- */
  //rename




  testScales(data, selector, scale, title) {
    console.log('------------------------------')
    console.log('------------------------------')
    console.log('title - ', title)
    console.log('domain - ', scale().domain())
    console.log('range - ', scale().range())
    console.log('-')
    console.log('-')
    for (let i=100; i<110; i++) {
      let datum = data[i],
      selected = selector(datum),
      scaled = scale()(selected)

      console.log('datum - ', datum)
      console.log('selected - ', selected)
      console.log('scaled - ', scaled)
      console.log('-')
    }
    console.log('------------------------------')
    console.log('------------------------------')
  }






  /* ------- Interaction Helpers ------- */

  // logic to decide whic data point is relevant based on the mouse position
  // and where to show the tooltip <div>
  // can I higlight the bar?
  handleTooltip(data, event){

    const { showTooltip } = this.props;
    const { x, y } = localPoint(event);
    var eachBand = this.getNumStrokesScaleX().step(),
        index = Math.floor((x / eachBand)),
        d = data[index]

    if(!d) return

    showTooltip({
      tooltipData: d,
      tooltipLeft: xMax, //this.getNumStrokesScaleX()(getID(d)),
      tooltipTop: 0 //height - this.getNumStrokesScaleY()(getNumStrokes(d)),
    });
  };

  handleDrag(event, data, selector, scale, zoom) {
    // generic
    
    const {x} = localPoint(event)
    const aproxData = scale.invert(x)
    let index = bisector(selector).left(data, aproxData, 1)
    const d0 = data[index-1]
    const d1 = data[index]
    let selectedData = d0

    if (d1 && selector(d1)) {
      if (aproxData - selector(d0) < aproxData - selector(d1)) {
        selectedData = d0
        index = index-1
      } else {
        selectedData = d1
      }
    }

    // specific
    // this could be moved into a save function callback
    this.setState({
      position: {
        index, //of data 
        x: scale(selector(selectedData))
      }
    })

    zoom.dragMove(event)
  }

  finishDrag() {
    const {x,y} = localPoint(event)

    if (x>0 && x<width && y>0 && y<height) {
      return
    }

    console.log(x, y)
    this.setState({
      position: null
    })
  }





  /* ------- Rendering Helpers ------- */

  renderEventListener(dateScale, zoom) {
    // let {data, hideTooltip}  = this.props
    return (
        <Bar
          x={0}
          y={0}
          width={width}
          height={height}
          fill="transparent"
          data={data}
          // onTouchStart={}
          // onTouchMove={}
          onMouseMove={event => 
            this.handleDrag(
              event,
              data,
              selectDate,
              dateScale,
              zoom
            )
          }
          onMouseDown={zoom.dragStart}
          onMouseUp={zoom.dragEnd}

          onDoubleClick={event => {
            const point = localPoint(event);
            zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
          }}
          onTouchEnd={event => this.finishDrag(event)}
          onMouseLeave={event => this.finishDrag(event)}
        />
    )
  }





  drawLineGraph() {
    // this.testScales(cityTemperature, selectDate, this.dateScale, 'date tests')
    const {position} = this.state
    return (
      <Zoom
        width={width}
        height={height}
        scaleXMin={1 / 2}
        scaleXMax={4}
        scaleYMin={1 / 2}
        scaleYMax={4}
        transformMatrix={initialTransform}
      >
        {zoom => {
          return (
            <div className='graph-container'>
              <svg width={width} height={height}>
                <rect x={0} y={0} width={width} height={height} fill={backgroundColor} rx={14}/>
                <g transform={zoom.toString()}>

                  <LinePath
                    data={position ? data.slice(0, position.index+1) : data}
                    x={d => dateScale(selectDate(d))}
                    y={d => temperatureSFScale(selectTemperature_SF(d))}
                    strokeWidth={2}
                    stroke={color1}
                  />
                  {position &&
                    <LinePath
                      data={data.slice(position.index)}
                      x={d => dateScale(selectDate(d))}
                      y={d => temperatureSFScale(selectTemperature_SF(d))}
                      strokeWidth={2}
                      stroke={color2}
                    />
                  }
                
                  {this.renderEventListener(dateScale, zoom)}

                  {position && 
                    <Line
                      from={{x:this.state.position.x, y: 0}}
                      to={{x:this.state.position.x, y: height}}
                      stroke={color1}
                    />
                  }
                </g>
                </svg>
                <button className="btn btn-lg" onClick={zoom.reset}>
                  Reset
                </button>
                <button className="btn btn-lg" onClick={zoom.clear}>
                  Clear
                </button>
            </div>
          )
              }}
      </Zoom>
    )
  }


  drawBarGraph() {
    let {data, tooltipData}  = this.props
    return (
      <div>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill={backgroundColor} />
          <Group>
            {data.map((d, i) => {
              const id = getCountry(d),
                    barWidth = this.getNumStrokesScaleX().bandwidth(),
                    barHeight = this.getNumStrokesScaleY()(getNumDrawings(d)),
                    barX = this.getNumStrokesScaleX()(id),
                    barY = height - barHeight,
                    color = this.scaleForColors()(getCountry(d))

              return (
                <Bar
                  key={`bar-${id}`}
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={color}
                  onClick={event => {
                    alert(`clicked: ${JSON.stringify(Object.values(d))}`);
                  }}
                />
              );
            })}

            {this.renderEventListener()}
          </Group>
        </svg>
        {tooltipData && this.drawTooltip()}
      </div>
    )
  }

  drawTooltip() {
    let {tooltipData, tooltipTop, tooltipLeft, drawings }  = this.props
    let shape = drawings.find((d) => {
      if (tooltipData.key_ids[0] === d.key_id) {
        return d
      }
    })
    return (
          <Tooltip
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              backgroundColor: "#FFF",
              color: "#000",
            }}
          >
          <div className='tooltip-container'>
            {this.drawShape(shape)}
            {'Country = ' + getCountry(shape) +'\n'}
            {'numStrokes = ' + getNumStrokes(shape)}
          </div>
          </Tooltip>
    )
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
      {/* {this.props.data && this.drawBarGraph()} */}
      {this.drawLineGraph()}
      </div> 
    
    )
  }


};

export default withTooltip(VxGraphs);