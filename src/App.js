import React, { Component } from 'react';
import './App.css';
import UserStatistics from './container/UserStatistics/UserStatistics';


class App extends Component {

  render() {
    return (
      <div className="App">
        <UserStatistics />
      </div>
    );
  }  
}

export default App;
