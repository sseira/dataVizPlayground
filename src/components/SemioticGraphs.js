import OrdinalFrame from "semiotic/lib/OrdinalFrame"
import React, { Component } from 'react'




const rAccessor = (d) => {
    if (d.key_ids) {
        return d.key_ids.length
    } else {
        console.log(d)
    }
}


class SemioticGraphs extends Component {
    constructor(props) {
        super(props)
    
        this.state = {extent: [1,2] }
        this.changeExtent = this.changeExtent.bind(this)
    }
    
    changeExtent(e, column) {
        console.log(e)
        console.log(column)
        // this.setState({
        //   selectedDataCount: this.props.data.filter(d => d.key_ids.length >= e[0] && d.key_ids.length <= e[1])
        //     .length
        // })
    }



    render(){
        return (
            <OrdinalFrame
                data={this.props.data}
                
                /* --- Size --- */ 
                size={[400,300]}
                
                /* --- Layout --- */
                type= {"bar"}
            
                /* --- Process --- */
                oAccessor= {"countrycode"}
                rAccessor= {rAccessor}
                // rExtent={[1,2]}
                /* --- Customize --- */
                style= {{ fill: "#ac58e5", stroke: "white" }}
                axes= {[{
                    orient: "left",
                    label: (
                      <text textAnchor="middle">
                        Num Drawings
                      </text>
                    )
                  }]}
                title= {"Tweets"}
            
                /* --- Annotate --- */
                // oLabel= {true}
                oLabel={d => <text fontSize={14}>{d}</text> }
                // hoverAnnotation={true}
                hoverAnnotation={[
                    { type: "frame-hover" },
                    { type: "highlight" },
                    { type: "y" }
                 ]}


                customHoverBehavior={d => {
                    console.log(d)
                }}

                interaction={{
                    end: () => this.changeExtent(e, column),
                    extent: ['US'],

                }}

                // interaction={{
                //     columnsBrush: true,
                //     extent: this.state.extent,
                //     end: this.changeExtent
                //   }}
            />
         )
    }
}

export default SemioticGraphs