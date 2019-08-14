import React, { Component } from 'react'

import { curveNatural } from '@vx/curve'
import { LinePath, Bar } from '@vx/shape'
import { scaleLinear, scaleBand, scaleOrdinal } from '@vx/scale'
import { Group } from '@vx/group';
import { withTooltip, Tooltip } from "@vx/tooltip";
import { localPoint } from "@vx/event";


import { schemeSet1 } from 'd3-scale-chromatic';
import { max } from 'd3-array'


/* ------- Layout Constants ------- */
const backgroundColor = "#32deaa",
      width = 400,
      height = 300,
      padding = 20,
      xMax = width - padding,
      yMax = height - padding

/* ------- Data Accessors ------- */
const getNumStrokes = d => d.drawing.length,
      getID = d => d.key_id
      




class VxGraphs extends Component {
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


  getNumStrokesScaleX() {
    return scaleBand({
      range: [0,xMax], 
      padding: 0.4,
      domain: this.props.data.map(d => d.key_id)
    })
  }

  scaleForColors() {
    let domain = this.props.data.map(d => d.key_id)
    return scaleOrdinal({
      range: schemeSet1, 
      domain: domain
    })
  }


  getNumStrokesScaleY(){
    return scaleLinear({
      domain: [0, max(this.props.data, (d) => {return +d.drawing.length})],
      range: [0, yMax]
    })
  }



  /* ------- Interaction Helpers ------- */

  // logic to decide whic data point is relevant based on the mouse position
  // and where to show the tooltip <div>
  // { event, data, xSelector, xScale, yScale }
  handleTooltip(data, event){


    const { showTooltip } = this.props;
    const { x, y } = localPoint(event);
    var eachBand = this.getNumStrokesScaleX().step(),
        index = Math.floor((x / eachBand)),
        d = data[index]

    if(!d) return

    showTooltip({
      tooltipData: d,
      tooltipLeft: this.getNumStrokesScaleX()(getID(d)),
      tooltipTop: height - this.getNumStrokesScaleY()(getNumStrokes(d)),
    });
  };


  /* ------- Rendering Helpers ------- */

  drawBarGraph() {
    let {data, tooltipData, showTooltip, hideTooltip}  = this.props

    return (
      <div>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill={backgroundColor} />
          <Group>
            {data.map((d, i) => {

              const id = getID(d),
                    barWidth = this.getNumStrokesScaleX().bandwidth(),
                    barHeight = this.getNumStrokesScaleY()(getNumStrokes(d)),
                    barX = this.getNumStrokesScaleX()(id),
                    barY = height - barHeight,
                    color = this.scaleForColors()(getID(d))

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
            <Bar
              x={0}
              y={0}
              width={width}
              height={height}
              fill="transparent"
              data={data}
              onMouseMove={data, event => {
                this.handleTooltip(data, event)
              }}
              onMouseLeave={data => event => hideTooltip()}
            />
          </Group>
        </svg>
        {tooltipData && this.drawTooltip()}
      </div>
    )
  }

  drawTooltip() {
    let {tooltipData, tooltipTop, tooltipLeft }  = this.props
    
    return (
          <Tooltip
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              backgroundColor: "#5C77EB",
              color: "#FFF",
            }}
          >
            {getNumStrokes(tooltipData)}
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

      {this.props.data ?
        this.drawBarGraph()
        :
        ''
      }



      {this.props.data.map(item => (
        <div key={item.timestamp}>
        {this.drawShape(item)}
        </div>
      ))}
      </div> 
    
    )
  }


};

export default withTooltip(VxGraphs);