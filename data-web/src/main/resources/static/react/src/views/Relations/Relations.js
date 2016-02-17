import React from "react";

import SearchBar from "./SearchBar";
import D3Panel from "./D3Panel";

class Relations extends React.Component {
    render() {
        return (
            <div>
                <SearchBar />
                <D3Panel />
            </div>
        );
    };
}

export default Relations;