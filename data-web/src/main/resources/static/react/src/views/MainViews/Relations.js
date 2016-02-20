import React from "react";

import SearchBarComponent from "./../SearchBar/SearchBarComponent";
import GraphPanel from "./../GraphPanel/GraphPanel";

import ExportToImage from "./../GraphPanel/ExportToImage";

class Relations extends React.Component {
    render() {
        return (
            <div>
                <SearchBarComponent />
                {/*<ExportToImage />*/}
                <GraphPanel />
            </div>
        );
    };
}

export default Relations;