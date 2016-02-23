import React from "react";

import Constants from "../../../config/Constants";

export default ( { openGroupId, id, clickHandler
    } ) => {
    return (
        <div className="panel panel-default" id={id}>
            <div className="panel-heading cursor" onClick={() => clickHandler()}>
                <h4 className="panel-title">
                    Relationships
                </h4>
            </div>

            {
                openGroupId === id ?
                <div className="panel-collapse collapse in">
                    <div className="panel-body">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.</div>
                </div> : <span/>
            }

        </div>
    );
};