import '../assets/stylesheets/base.scss'

import React, { Component } from 'react'
import {Switch, Route} from "react-router-dom";
import GlobalSidebar from './GlobalSidebar/GlobalSidebar';
import AllProjects from './AllProjects/AllProjects';
import Project from './Project/Project';

/* ---------------------------------------------------- */

// TODO: get default routing working
// TODO: make all class components hooks



class App extends Component {

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
    const {} = this.state
    return (
      <div className='app-container'>
        <GlobalSidebar/>
        <div className='page-view'>
          <Switch>
            
            <Route path='/projects/:projectID'>
              <Project/>
            </Route>

            <Route path='/projects'>
              <AllProjects/>
            </Route>
            <Route path='/insights'>
              insights
            </Route>
            <Route path='/'>
              <AllProjects/>
            </Route>
          </Switch>
        </div>
      </div>
    )
  }

};

export default App;
