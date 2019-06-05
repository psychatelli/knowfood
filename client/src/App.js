import React, { Component, useEffect } from 'react';

import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import  {BrowserRouter as Router, Route, Switch}  from 'react-router-dom';

// import Nav from './components/Nav';

import Home from './pages/home';
 import Recipe from './pages/Recipe/recipe';
 import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
// import Navbar from './components/Navbar';
import Register from './pages/auth/Register';
// import Login from './pages/auth/Login';
// import Landing from './pages/Landing';

if(localStorage.token){
  setAuthToken(localStorage.token)
}





const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
    }, []);

  return(
<Provider store={store}> 
        <Router>
          <div>
            {/* <Nav/> */}
              <div className="Wrapper"> 
                <Switch> 
                  <Route exact path="/" component={Home} />
                </Switch>


                <Switch> 
                  <Route exact path="/register" component={Register} />
                </Switch>

                {/* <Switch> 
                  <Route exact path="/login" component={Login} />
                </Switch>

                <Switch> 
                  <Route exact path="/landing" component={Landing} />
                </Switch> */}

                <Switch>
                  <Route exact path="/recipe/:id" component={Recipe} />
                </Switch>
              </div>
          </div>
        </Router>
        </Provider>

  )
}



export default App;
