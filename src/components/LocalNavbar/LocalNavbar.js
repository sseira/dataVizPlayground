import '../../assets/stylesheets/base.scss'
import './LocalNavBar.scss'

import React, { Component } from 'react'
import {Switch, Route, NavLink, useParams, useRouteMatch} from "react-router-dom";

/* ---------------------------------------------------- */

export default function LocalNavBar (props) {

  let {tabs} = props
  let {url, path} = useRouteMatch();
  let {navPath} = useParams();

  return (
    <div className='navbar-container'>
      <div className='navbar-header'>
        {
          Object.keys(tabs).map((key) => {
            const title = tabs[key].title
              return (
                <NavLink to={`${url}/${key}`} activeClassName='active' className='navbar-item body-header' key={key}>
                  {title}
                </NavLink>
              )
          })
        }
      </div>
      <div className='navbar-view'>
        <Switch>
          <Route path={`${path}/:navPath`}>
            <NavbarView 
              tabs={tabs}
            />
          </Route>
        </Switch>
      </div>
    </div>
  )
}
    


function NavbarView (props) {
  const {tabs} = props;
  let {navPath} = useParams();

  return tabs[navPath].component
}