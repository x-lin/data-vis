import React from "react";
import { connect } from "react-redux";

export default ( {
    modalId,
    checkboxes,
    title
} ) => {
    return (
        <div className="modal fade" id={modalId} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">{title}</h4>
                    </div>

                    <div className="modal-body">
                        {checkboxes}
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};