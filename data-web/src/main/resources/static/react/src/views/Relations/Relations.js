import React from "react";

import SearchBarComponent from "./../SearchBar/SearchBarComponent";
import D3Panel from "./GraphPanel";

import ExportToImage from "./ExportToImage";

class Relations extends React.Component {
    render() {
        return (
            <div>
                <SearchBarComponent />
                {/*<ExportToImage />*/}
                <D3Panel />
            </div>
        );
    };
}

export default Relations;