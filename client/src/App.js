import React from 'react'
import { Route } from 'react-router-dom'
import './App.css';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import CountryDitails from './components/CountryDitails/CountryDitails';
// import NotFound from './components/NotFound/NotFound';
import Form from './components/Form/Form';

function App() {
  return (
    <React.Fragment>
      <Route exact path = '/' component={Landing}/>
      <Route exact path = '/home' component={Home}/>
      <Route exact path = '/home/:id' component={CountryDitails}/>
      <Route exact path = '/form' component={Form}/>
      {/* <Route path = '/*' component={NotFound}/> */}
    </React.Fragment>
  );
}

export default App;
