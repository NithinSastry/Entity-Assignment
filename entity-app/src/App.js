import React from 'react';

import EntityModel from './model/entity-model';

import NoChildParent from './components/NoChildParent';
import OneLevelChild from './components/OneLevelChild';
import NestedChild from './components/NestedChild';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelLoaded: false,
    };
    this.loadApp = this.loadApp.bind(this);
  }
  componentDidMount() {
    this.entityModel = new EntityModel();
    this.entityModel.subscribe(this.loadApp);
  }
  loadApp() {
    this.setState({
      modelLoaded: true,
    });
  }
  render() {
    if (this.state.modelLoaded) {
      const noCPEntities = this.entityModel.eNoChild;
      return (
        <div className="app">
          <NoChildParent entities={noCPEntities} />
          <OneLevelChild />
          <NestedChild />
        </div>
      );
    } else {
      return <p>App loading...</p>;
    }
  }
}

export default App;
