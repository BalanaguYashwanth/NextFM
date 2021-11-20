import React from 'react'
import logo from './logo.svg';
import './App.css';
import Home from './screens/home'
import Navbar from './navigation/navbar'
import Login from './screens/login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './navigation/layout'
import { makeStyles } from '@material-ui/core'
import Episodes from './screens/episodes'
import Listenlinks from './screens/listenlinks'
import Logout from './screens/logout'
import Sponsors from './screens/sponsors'
import Add from './screens/add' 

function App() {

  return (
    <div className="App" >
      <div>
        <Router>
          <Switch>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Layout>
              <Route exact path='/' >
                <Home />
              </Route>
              <Route exact path="/episodes" >
                <Episodes />
              </Route>
              <Route exact path='/listenlinks' >
                <Listenlinks />
              </Route>
              <Route exact path='/logout'>
                <Logout />
              </Route>
              <Route exact path='/sponsors'> 
                  <Sponsors />
              </Route>
              <Route exact path='/add'>
                <Add />
              </Route>
            </Layout>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
