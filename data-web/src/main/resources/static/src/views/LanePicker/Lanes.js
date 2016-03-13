import React from 'react';
import Lane from './Lane';

export default class extends React.Component {

  renderLane(lane) {
    return <Lane className="lane" key={lane.id} lane={lane}
          notes={lane.notes}
          move={this.props.move}
          attachToLane={this.props.attachToLane} />
  }

  render() {
    return (
        <div className="lanes">{this.props.lanes.map(lane => this.renderLane(lane))}</div>
    );
  }
}