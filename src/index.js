import React from 'react';
import ReactDOM from 'react-dom';
import './view/css/index.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import App from "./controller/App";
import List from './view/List';
import Login from './view/Login';
import Student_list from './view/Student_list';


const routes = (
  <BrowserRouter>
<Switch>
<Route exact path="/" component={Login}/>  
<Route  path="/App" component={App}/>  
<Route  path="/List" component={List}/> 
<Route  path="/Student_list" component={Student_list}/> 
 </Switch> 
  </BrowserRouter>
)

ReactDOM.render(
  <React.StrictMode>
    {routes}
  </React.StrictMode>,
  document.getElementById('root')
);



