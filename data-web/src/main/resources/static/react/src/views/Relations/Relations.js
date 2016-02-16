import React from "react";

import Search from "./Search";
import D3Panel from "./D3Panel";

class Relations extends React.Component {
    render() {
        return (
            <div>
                <Search />
                <D3Panel />
            </div>
        );
    };
}

export default Relations;