import React from 'react';
import { Route, Link } from 'react-router-dom';
import Currency from './converters/Currency';
import Length from './converters/Length';
import Volume from './converters/Volume';
import Time from './converters/Time';
import logo from './SVG/logo.svg'
import './App.css'

export default function App() {
  return (
    <div className="App">
      <div className="parent">
        <div className="header">
          <Link to="/"><img src={logo} alt="SWITCHEЯ" height="60" /></Link>
        </div>
        <nav className="navBar">
            <ul>
              <li><Link to="/">Currency</Link></li>
              <li><Link to="/length">Length</Link></li>
              <li><Link to="/volume">Volume</Link></li>
              <li><Link to="/time">Time</Link></li>
            </ul>
          </nav>
        <div className="bodyContainer">
          <Route exact path="/" component={Currency} />
          <Route exact path="/length" component={Length} />
          <Route exact path="/volume" component={Volume} />
          <Route exact path="/time" component={Time} />
        </div>
      </div>
    </div> // RENDERS THE SPECIFIED UI WHEN THE LINK LOCATION MATCHES THE ROUTE PATH
  )
}