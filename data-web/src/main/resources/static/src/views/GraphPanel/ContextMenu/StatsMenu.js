import React from "react";
import d3 from "d3";
import { OverlayTrigger, Tooltip} from "react-bootstrap";
import { connect } from "react-redux";

import Constants from "../../../config/Constants";
import CircleSpan from "../../widgets/CircleSpan";
import Label from "../../widgets/Label";
import { getNeighborTypes } from "../../../actions/aggregated/promises/GETNeighborTypesActions";
import { filterNeighborTypes } from "../../../actions/action-creators/ContextMenuActions";
import { searchNeighbors } from "../../../actions/aggregated/SearchNeighborsActions";
import { NEIGHBORTYPES_FETCH_SUCCESS } from "../../../actions/action-creators/SearchNeighborTypesActions";

const UPSTREAM = "UPSTREAM";
const DOWNSTREAM = "DOWNSTREAM";

class StatsMenu extends React.Component {
    render() {
        return <div></div>
    }
}