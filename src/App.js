import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Dev from './components/Dev';
import Pair from './components/Pair';
import { reset } from './store';

import './App.css';

class App extends React.Component {
  render() {
    const { devs, pairs, loading } = this.props;

    if (loading) {
      return <span>Loading...</span>;
    }

    return (
      <div className="App">
        <button onClick={reset}>Reset</button>
        <div className="App-devs-container">
          {devs.map((dev, i) =>
            <Dev dev={dev} key={i} />
          )}
        </div>
        <hr />
        <div className="App-pairs-container">
          {pairs.map((pair, i) =>
            <Pair devs={pair} index={i} key={i} />
          )}
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
