import React from "react";
import ReactDOM from "react-dom";

import { Overlay, Tooltip as BootstrapTooltip } from "react-bootstrap";

const Tooltip = ({ target, tooltip }) => {
    return (
        <Overlay
          show
          target={() => ReactDOM.findDOMNode(target)}
          placement="right"
          container={this}
        >
            <BootstrapTooltip
              className="in"
              id="actual-tooltip"
            >
                {tooltip}
            </BootstrapTooltip>
        </Overlay>
    );
}

Tooltip.propTypes = {
    target: React.PropTypes.node.isRequired,
    tooltip: React.PropTypes.node.isRequired
};

export default Tooltip;
