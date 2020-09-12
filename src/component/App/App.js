import React from 'react';
import {Route, BrowserRouter ,Switch} from 'react-router-dom'
import Header from '../Header/index'
import Landing from '../Landing/index'
import Footer from '../Footer/index'
import Welcome from '../Welcome/index'
import Login from '../Login/index'
import Inscription from '../Inscription/index'
import ErrorPage from '../ErrorPage/index'
import ForgetPasswd from '../ForgetPasswd/index'
import '../../App.css';
import { IconContext } from 'react-icons'


function App() {


  return (
    <BrowserRouter >
      <Header />
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>

      <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/Inscription' component={Inscription} />
      <Route path='/Login' component={Login} />
      <Route path='/Welcome' component={Welcome} />
      <Route path='/ForgetPasswd' component={ForgetPasswd} />
      <Route  component={ErrorPage} />
      </Switch>

      </IconContext.Provider>

      <Footer />
    </BrowserRouter>
  ); 
}

export default App;
