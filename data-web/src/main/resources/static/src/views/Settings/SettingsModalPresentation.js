import React from "react";

import GraphLoaderComponent from "../GraphLoader/GraphLoaderComponent";

export default ( {
    modalId,
    title,
    toggleHandler,
    settings
} ) => {
    const renderCheckboxes = () => {
        return settings.map((setting, index) => {
            return (
                <div className="checkbox " key={index}>
                    <label>
                        <input type="checkbox" value={setting.name} checked={setting.value}
                               onChange={toggleHandler}/>
                        {setting.description}
                    </label>
                </div>
            );
        });
    };

    return (
        <div className="modal fade" id={modalId} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">{title}</h4>
                    </div>

                    <div className="container">
                        <div className="modal-body">
                            {renderCheckboxes()}
                            <GraphLoaderComponent />
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};