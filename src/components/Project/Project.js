import '../../assets/stylesheets/base.scss'
import './Project.scss'

import React, {useState} from 'react'
import {useParams, useRouteMatch} from "react-router-dom";

import LocalNavbar from "../LocalNavbar/LocalNavbar"



export default function Project(props) {
  let { projectID } = useParams();
  //TODO: understand tradeoffs routematch & params & props
 


  const tabs = {
    'all-models': {title:'All Models', component:<div> all models</div>},
    'monitoring': {title:'Monitoring', component:<div> monitoring </div>}
  }

  return (
    <div className='project-view-container'>
      <div className='page-title'> {projectID} </div>
      <LocalNavbar
        tabs={tabs}
      />
    </div>
  )
}