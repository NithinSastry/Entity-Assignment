import React from 'react';

import EntityModel from './model/entity-model';

import RenderEntities from './components/RenderEntities';
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
      const entityOneLevel = this.entityModel.eOneLevelChild;
      return (
        <div className="App">
          <RenderEntities entities={noCPEntities} />
          <RenderEntities entities={entityOneLevel} />
        </div>
      );
    } else {
      return <p>App loading...</p>;
    }
  }
}

export default App;
