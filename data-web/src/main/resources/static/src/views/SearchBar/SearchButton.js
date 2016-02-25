import React from "react";

export default ( {
    } ) => {

    return (
        <span className="input-group-btn fixed">
            {/*<button className="btn btn-default" ng-hide="loadedData">
             <span className="glyphicon glyphicon-refresh glyphicon-spin" aria-hidden="true"></span>&nbsp;
             </button>*/}
            <button className="btn btn-default btn-flat" type="submit">
                <span className="fa  fa-search" aria-hidden="true"></span>&nbsp;
            </button>
        </span>
    );
};