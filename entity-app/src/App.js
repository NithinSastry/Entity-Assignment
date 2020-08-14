import React from 'react';
import './App.css';
import NoChildParent from './components/NoChildParent';
import OneLevelChild from './components/OneLevelChild';
import NestedChild from './components/NestedChild';

function App() {
  return (
    <div className="App">
      <h1>App componenet</h1>
      <NoChildParent />
      <OneLevelChild />
      <NestedChild />
    </div>
  );
}

export default App;
