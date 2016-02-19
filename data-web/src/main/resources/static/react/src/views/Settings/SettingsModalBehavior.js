import React from "react";

import { toggleSetting } from "../../actions/UserActions/SettingsActions"
import SettingsModalPresView from "./SettingsModalPresent";

export default class extends React.Component {
    handleToggle(event) {
        this.props.toggle(event.target.value);
    }

    renderCheckboxes() {
        const { settings } = this.props;

        return settings.map((setting, index) => {
            return (
                <div className="checkbox " key={index}>
                    <label>
                        <input type="checkbox" value={setting.name} checked={setting.value}
                               onChange={(event) => this.handleToggle(event)}/>
                        {setting.description}
                    </label>
                </div>
            );
        });
    };

    render() {
        return (
            <SettingsModalPresView
                title={"Settings"}
                checkboxes={this.renderCheckboxes()}
                modalId={this.props.modalId}
            />
        )
    }
}