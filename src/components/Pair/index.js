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
        padding: `${paddingFor(devs.length)}em 0em`,
        backgroundColor: isOver ? '#FFEB3B' : 'white'
      }}>
        {devs.map((dev, i) =>
          <Dev dev={dev} key={i} />
        )}
      </div>
    );
  }
}

function paddingFor(numDevs) {
  console.log(numDevs);
  const rows = Math.ceil(numDevs / 2);
  return Math.max(0, rows - 1) * 0.5;
}

export default DropTarget('Dev', devTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))(Pair);
