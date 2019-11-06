import '../../assets/stylesheets/base.scss'
import './GlobalSidebar.scss'

import React, { Component } from 'react'
import {NavLink} from "react-router-dom";

import ProjectsSVG from '../../assets/images/projects.svg'
import InsightsSVG from '../../assets/images/insights.svg'
import DataSVG from '../../assets/images/data.svg'
import TeamSVG from '../../assets/images/team.svg'
import SettingsSVG from '../../assets/images/settings.svg'
import AccountSVG from '../../assets/images/account.svg'    



/* ---------------------------------------------------- */

class GlobalSidebar extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        data: [],
      };
    }
  
    componentDidMount() {
      this.setState(state => {
        const data = true
        return {
          data
        }
      })  }
  
    render() {
    //   const {} = this.state

      const sidebarItems = {
          Projects: {icon: <ProjectsSVG/>, path:'/projects'},
          Insights: {icon: <InsightsSVG/>, path:'/insights'},
          Data: {icon: <DataSVG/>, path:'/data'},
          Teams: {icon: <TeamSVG/>, path:'/teams'},
          Settings: {icon: <SettingsSVG/>, path:'/settings'},
          Account: {icon: <AccountSVG/>, path:'/account'}
      }

      return (
        <div className='sidebar-container'>
            {
                Object.keys(sidebarItems).map((key) => {
                    const icon = sidebarItems[key].icon
                    const path = sidebarItems[key].path

                    return (
                        <NavLink to={path} activeClassName="active" className='sidebar-item' key={key}>
                            {icon}
                            <div className='sidebar-item-title body-text'>
                                {key}
                            </div>
                        </NavLink>
                    )
                })
            }
            
  
        </div>
      )
    }
  
  };
  
  export default GlobalSidebar;
  