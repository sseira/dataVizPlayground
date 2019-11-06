import '../../assets/stylesheets/base.scss'
import './AllProjects.scss'

import React, { useState } from 'react'
import {Link, useRouteMatch} from "react-router-dom";

  
// temporary model icons
import ProjectsSVG from '../../assets/images/projects.svg'
import InsightsSVG from '../../assets/images/insights.svg'



/* ---------------------------------------------------- */

export default function AllProjects() {
  let { path, url } = useRouteMatch();

  const projects = {
    CreditProject: {id:'creditID'},
    MortageProject: {id:'mortageID'}
  }

  return (
    <div className='all-projects-container'>
        {
            Object.keys(projects).map((key) => {
                const id = projects[key].id

                return (
                    <Link to={`${path}/${id}/all-models`} className='project-overview-container' key={key}>
                        <div className='project-title body-header'>
                            {key}
                        </div>
                        <div className='project-info'>
                          Helpful info about a project
                        </div>
                    </Link>
                )
            })
        }
    </div>
  )
}
  