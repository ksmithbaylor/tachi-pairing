import React from 'react';
import { DropTarget } from 'react-dnd';

import Dev from '../Dev';
import { addPair } from '../../store';

import './Pair.css';

const devTarget = {
  drop(props, monitor, component) {
    const dev = monitor.getItem();
    console.log('drop', dev);
    addPair(dev, props.index);
  }
};

class Pair extends React.Component {
  render() {
    const { devs, connectDropTarget, isOver, index } = this.props;

    return connectDropTarget(
      <div className="Pair" style={{
        backgroundColor: isOver ? '#FFEB3B' : 'white'
      }}>
        {devs.map((dev, i) =>
          <Dev dev={dev} key={i} />
        )}
      </div>
    );
  }
}

export default DropTarget('Dev', devTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))(Pair);
