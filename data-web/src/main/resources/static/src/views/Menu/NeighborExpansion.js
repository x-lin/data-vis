import React from "react";

import Slider from "../widgets/Slider";

export default ( {setFilterValue, limit} ) => {
    return <div>
            <Slider min={0} max={100} defaultValue={limit} onChange={(val) => setFilterValue("limit", val)} />
        </div>
};