import React from "react";
import { connect } from "react-redux";

import { toggleSetting } from "../../actions/UserActions/SettingsActions";

export default ( { modalId, checkboxes } ) => {
    return (
        <div className="modal fade" id={modalId} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Settings</h4>
                    </div>
                    <div className="modal-body">
                        {checkboxes}

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