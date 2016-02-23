import React from "react";

import Constants from "../../../config/Constants";

export default ( { openGroupId, id, clickHandler
    } ) => {


    return (
        <div className="panel panel-default" id={id}>
            <div className="panel-heading cursor"  onClick={() => clickHandler()}>
                <h4 className="panel-title">
                    Basic Data
                </h4>
            </div>

            {
                openGroupId === id ?
                <div className="panel-collapse collapse in">
                    <div className="panel-body">

                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.</div>
                </div> : <span/>
            }

        </div>
    );
};