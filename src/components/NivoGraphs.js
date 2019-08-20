import { ResponsiveBar } from '@nivo/bar'
import React, { Component } from 'react'





const indexFunc = (d) => d.countrycode


class NivoGraphs extends Component {

    /* ------- Processing data ------- */

    addNumDrawingsToData() {
        let {data} = this.props
        let new_data = data.map((d,i) => {
            let new_d = d
            new_d['numDrawings'] = d.key_ids.length
            return new_d
        })

        return new_data
    }



    /* ------- All in one rendering ------- */

    renderBarGraph() {
        let data = this.addNumDrawingsToData() 
        return (
            <ResponsiveBar
                data={data}
                keys={['numDrawings']}
                indexBy={indexFunc}
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
                    legend: 'country',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'numDrawings',
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