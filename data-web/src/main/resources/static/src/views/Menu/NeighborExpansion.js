import React from "react";

import Slider from "../widgets/Slider";

const NeighborExpansion = ({ setFilterValue, limit }) => {
    return <Slider min={0} max={100} defaultValue={limit} onChange={(val) => setFilterValue("limit", val)} />;
};

NeighborExpansion.propTypes = {
    setFilterValue: React.PropTypes.func.isRequired,
    limit: React.PropTypes.number.isRequired
};

export default NeighborExpansion;
