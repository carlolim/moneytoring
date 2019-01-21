import React, { Component } from 'react';
import './App.css';
import Main from './components/common/main';
import Navigation from './components/common/navigation';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Navigation />  
        <Main />
        <div className="overlay"></div>
      </div>
    );
  }
}

export default App;
