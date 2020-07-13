import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import Login from './pages/Login.jsx'
import Index from './pages/Index.js'
import Home from './component/user/Home/SystemIndex'
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom'

function App() {
  return (
      <Router>
        <div className="App">
          <Route path="/" exact render={()=><Redirect to="/login"/>} />
          <Route path="/login" component={Login}/>
          <Route path="/index" component={Index}/>
          {/*<UserMange></UserMange>*/}
          {/*<TreeCOM></TreeCOM>*/}
        </div>
      </Router>

  );
}

export default App;
