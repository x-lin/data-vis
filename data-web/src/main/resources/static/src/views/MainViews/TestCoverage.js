import React from "react";

import LanePicker from "../LanePicker/LanePicker";
import TestCoverageComponent from "../TestCoveragePanel/TestCoverageComponent";

export default (params) => {
    return (
        <div>
            <TestCoverageComponent searchKey={params.params.key} searchType={params.params.type} />
        </div>
    );
}