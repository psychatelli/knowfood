import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import  {BrowserRouter as Router, Route, Switch}  from 'react-router-dom';
import Nav from './components/Nav';

import Home from './pages/home';

class App extends Component {
  render() {
    return (
      <Provider store={store}> 
        <Router>
          <div>
            <Nav/>
              <div className="Wrapper"> 
              <Switch> 
              <Route exact path="/" component={Home} />
              </Switch>

              </div>
          </div>
        </Router>
        </Provider>
    );
  }
}

export default App;
