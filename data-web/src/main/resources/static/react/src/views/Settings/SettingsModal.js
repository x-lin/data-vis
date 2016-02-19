import React from "react";
import { connect } from "react-redux";

import { toggleSetting } from "../../actions/UserActions/SettingsActions";

class SettingsModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkBoxes: this.initCheckboxes
        }
    };

    initCheckboxes() {
        const checkBoxes = {};

        for(let i = 0; i < this.props.settings.length; i++) {
            checkBoxes[this.props.settings.name] = this.props.settings.value;
        }

        return checkBoxes;
    }

    handleToggle(event) {
        const obj = {};
        obj[event.target.value] = !this.state.checkBoxes[event.target.value];
        this.setState(obj);
        this.props.toggle(event.target.value);
    }

    render() {
        var checkboxes = this.props.settings.map((setting, index) => {
            return <label key={index}><input type="checkbox" value={setting.name} checked={this.state[name]} onChange={(event) => this.handleToggle(event)}/>{setting.description}</label>;
        });

        return (
            <div className="modal  fade" id={this.props.modalId} role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content ">
                        <div className="modal-header ">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Settings</h4>
                        </div>
                        <div className="modal-body">
                            <div className="checkbox">
                                {checkboxes}
                            </div>

                            {/*<div className="checkbox disabled">
                                <label><input type="checkbox" value="" disabled>Option 3</label>
                            </div>*/}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        settings: state.settings
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        toggle: (name) => {
            dispatch(toggleSetting(name));
        }
    };
};

const SettingsModalConnect = connect(
    mapStateToProps,
    mapDispatchProps
)(SettingsModal);

export default SettingsModalConnect;