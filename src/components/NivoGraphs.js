import { ResponsiveBar } from '@nivo/bar'
import React, { Component } from 'react'


class NivoGraphs extends Component {


    testData() {
        console.log('herer') 
        return ([{
              "country": "AD",
              "hot dog": 184,
              "hot dogColor": "hsl(117, 70%, 50%)",
              "burger": 187,
              "burgerColor": "hsl(193, 70%, 50%)",
              "sandwich": 101,
              "sandwichColor": "hsl(95, 70%, 50%)",
              "kebab": 69,
              "kebabColor": "hsl(279, 70%, 50%)",
              "fries": 150,
              "friesColor": "hsl(257, 70%, 50%)",
              "donut": 129,
              "donutColor": "hsl(325, 70%, 50%)"
            },
            {
              "country": "AE",
              "hot dog": 14,
              "hot dogColor": "hsl(197, 70%, 50%)",
              "burger": 32,
              "burgerColor": "hsl(291, 70%, 50%)",
              "sandwich": 149,
              "sandwichColor": "hsl(71, 70%, 50%)",
              "kebab": 195,
              "kebabColor": "hsl(300, 70%, 50%)",
              "fries": 194,
              "friesColor": "hsl(69, 70%, 50%)",
              "donut": 88,
              "donutColor": "hsl(29, 70%, 50%)"
            },
            {
              "country": "AF",
              "hot dog": 185,
              "hot dogColor": "hsl(323, 70%, 50%)",
              "burger": 185,
              "burgerColor": "hsl(221, 70%, 50%)",
              "sandwich": 120,
              "sandwichColor": "hsl(242, 70%, 50%)",
              "kebab": 152,
              "kebabColor": "hsl(141, 70%, 50%)",
              "fries": 70,
              "friesColor": "hsl(158, 70%, 50%)",
              "donut": 121,
              "donutColor": "hsl(20, 70%, 50%)"
            },
            {
              "country": "AG",
              "hot dog": 62,
              "hot dogColor": "hsl(131, 70%, 50%)",
              "burger": 51,
              "burgerColor": "hsl(352, 70%, 50%)",
              "sandwich": 189,
              "sandwichColor": "hsl(68, 70%, 50%)",
              "kebab": 47,
              "kebabColor": "hsl(335, 70%, 50%)",
              "fries": 36,
              "friesColor": "hsl(43, 70%, 50%)",
              "donut": 18,
              "donutColor": "hsl(269, 70%, 50%)"
            },
            {
              "country": "AI",
              "hot dog": 143,
              "hot dogColor": "hsl(110, 70%, 50%)",
              "burger": 67,
              "burgerColor": "hsl(85, 70%, 50%)",
              "sandwich": 31,
              "sandwichColor": "hsl(23, 70%, 50%)",
              "kebab": 128,
              "kebabColor": "hsl(97, 70%, 50%)",
              "fries": 10,
              "friesColor": "hsl(16, 70%, 50%)",
              "donut": 113,
              "donutColor": "hsl(220, 70%, 50%)"
            },
            {
              "country": "AL",
              "hot dog": 69,
              "hot dogColor": "hsl(331, 70%, 50%)",
              "burger": 177,
              "burgerColor": "hsl(227, 70%, 50%)",
              "sandwich": 118,
              "sandwichColor": "hsl(108, 70%, 50%)",
              "kebab": 157,
              "kebabColor": "hsl(251, 70%, 50%)",
              "fries": 45,
              "friesColor": "hsl(206, 70%, 50%)",
              "donut": 108,
              "donutColor": "hsl(89, 70%, 50%)"
            },
            {
              "country": "AM",
              "hot dog": 122,
              "hot dogColor": "hsl(301, 70%, 50%)",
              "burger": 33,
              "burgerColor": "hsl(90, 70%, 50%)",
              "sandwich": 128,
              "sandwichColor": "hsl(21, 70%, 50%)",
              "kebab": 127,
              "kebabColor": "hsl(65, 70%, 50%)",
              "fries": 6,
              "friesColor": "hsl(33, 70%, 50%)",
              "donut": 30,
              "donutColor": "hsl(132, 70%, 50%)"
            }])
    }



    addNumStrokesToData() {
        let {data} = this.props

        let new_data = data.map((d,i) => {
            let new_d = d
            new_d['numStrokes'] = d.drawing.length
            return new_d
        })

        return new_data
    }

    renderBarGraph() {
        let data = this.addNumStrokesToData() //this.testData()//this.props


        return (
            <ResponsiveBar
                data={data}
                keys={['numStrokes']}
                indexBy={(d) => {return d.key_id}}
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{ scheme: 'nivo' }}
               
                
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'key_id',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'numStrokes',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                enableGridY={true}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        )
    }


    render() {
        return (
            <div className='nivo-graph graph-container'>
                {this.renderBarGraph()}
            </div>
        )
    }
}

export default NivoGraphs;