import React from "react";

import SearchBarComponent from "../SearchBar/SearchBarComponent";
import GraphPanel from "../GraphPanel/GraphPanel";

import ExportToImage from "../GraphPanel/ExportToImage";

import LeftSideBar from "../widgets/LeftSideBar";
import SettingsModalComponent from "../Settings/SettingsModalComponent";

class Relations extends React.Component {
    render() {
        return (
            <div>
                <LeftSideBar />
                <SearchBarComponent />
                {/*<ExportToImage />*/}
                <GraphPanel />
                <SettingsModalComponent  modalId={"settingsModal"} />
            </div>
        );
    };
}

export default Relations;