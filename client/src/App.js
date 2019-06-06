import React, { Component, useEffect } from 'react';

import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import  {BrowserRouter as Router, Route, Switch}  from 'react-router-dom';

 import Navbar from './components/Navbar';

import Recipies from './pages/recipies';
 import Recipe from './pages/Recipe/recipe';
 import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
// import Navbar from './components/Navbar';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Landing from './pages/landing';

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
            <Navbar/>
              <div className="Wrapper"> 
                <Switch> 
                  <Route exact path="/" component={Landing} />
                </Switch>


                <Switch> 
                  <Route exact path="/register" component={Register} />
                </Switch>

                 <Switch> 
                  <Route exact path="/login" component={Login} />
                </Switch>

               <Switch> 
                  <Route exact path="/recipies" component={Recipies} />
                </Switch>

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
