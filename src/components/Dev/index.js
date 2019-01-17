import React from 'react';
import { DragSource } from 'react-dnd';

import { unpair } from '../../store';

import './Dev.css';

const devSource = {
  beginDrag(props) {
    return props.dev;
  },

  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      unpair(props.dev);
    }
  }
};

class Dev extends React.Component {
  render() {
    const {
      dev = { name: '[Name]', color: '#fff'},
      connectDragSource = x => x,
      isDragging
    } = this.props;

    const { name, color } = dev;

    return connectDragSource(
      <div className="Dev" style={{
        backgroundColor: color,
        outline: isDragging ? '2px dotted #333' : '2px solid #555',
        opacity: isDragging ? '0.4' : 'initial',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}>
        <span className="Dev-name">{name}</span>
      </div>
    );
  }
}

export default DragSource('Dev', devSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Dev);
export { Dev };
