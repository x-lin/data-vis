import React from "react";

export default ( {
    } ) => {

    return (
        <span className="input-group-btn fixed">
            {/*<button className="btn btn-default" ng-hide="loadedData">
             <span className="glyphicon glyphicon-refresh glyphicon-spin" aria-hidden="true"></span>&nbsp;
             </button>*/}
            <button className="btn btn-default" type="submit">
                <span className="glyphicon glyphicon-search " aria-hidden="true"></span>&nbsp;
            </button>
        </span>
    );
};