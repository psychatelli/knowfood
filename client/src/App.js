  import React, { Component, useEffect } from 'react';

  import { Provider } from 'react-redux';
  import store from './store';
  import './App.css';

  import  {BrowserRouter as Router, Route, Switch}  from 'react-router-dom';
  import PrivateRoute from './components/common/privateroute';
  import Navbar from './components/Navbar';

  import Recipies from './pages/recipes';
  import Recipe from './pages/Recipe/recipe';
  import { loadUser } from './actions/auth';
  import setAuthToken from './utils/setAuthToken';
  // import Navbar from './components/Navbar';
  import Register from './pages/auth/Register';
  import Login from './pages/auth/Login';
  import Landing from './pages/landing';
  import Profiles from './pages/profiles';
  
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
                  <PrivateRoute exact path="/recipies" component={Recipies} />
                </Switch>

                <Switch>
                  <PrivateRoute exact path="/recipe/:id" component={Recipe} />
                </Switch>

                <Switch>
                  <Route exact path="/profiles" component={Profiles} />
                </Switch>


              </div>
          </div>
        </Router>
        </Provider>

  )
}



export default App;
