import React from "react";

import SearchBar from "./../SearchBar/SearchBar";
import D3Panel from "./GraphPanel";

import ExportToImage from "./ExportToImage";

class Relations extends React.Component {
    render() {
        return (
            <div>
                <SearchBar />
                {/*<ExportToImage />*/}
                <D3Panel />
            </div>
        );
    };
}

export default Relations;