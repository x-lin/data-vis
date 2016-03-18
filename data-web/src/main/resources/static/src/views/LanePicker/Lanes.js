import React from 'react';
import Lane from './Lane';

export default class extends React.Component {
  componentWillMount() {
    this.props.getNodeTypes();
  }

  renderLane(lane) {
    return <Lane className="lane" key={lane.id} lane={lane}
          notes={lane.notes}
          move={this.props.move}
          attachToLane={this.props.attachToLane} />
  }

  render() {
    return (
        <div>{this.props.lanes.map(lane => this.renderLane(lane))}</div>
    );
  }
}