import React from "react";

export default ( {
    activeCategory,
    activeInputValue,
    categories,
    items,
    inputChangeHandler,
    inputKeyDownHandler,
    submitHandler,
    } ) => {

    return (
        <form onSubmit={(event) => submitHandler(event)}>
            <div className="input-group fixed">
                <div className="input-group-btn  search-panel">
                    <button type="button" className="btn  btn-default dropdown-toggle" data-toggle="dropdown">
                        <span id="search_concept">{activeCategory}</span> <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" role="menu">
                        {categories}
                    </ul>
                </div>

                <input
                    value={activeInputValue}
                    type="text"
                    className=" form-control"
                    id="search"
                    onChange={(event) => inputChangeHandler(event)}
                    autoComplete="off"
                    onKeyDown={(event) => inputKeyDownHandler(event)}
                />

                {items.length > 0 ?
                    <ul className="list-group list-z">
                        {items}
                    </ul> : <span/>
                }

                <span className="input-group-btn fixed">
                    {/*<button className="btn btn-default" ng-hide="loadedData">
                     <span className="glyphicon glyphicon-refresh glyphicon-spin" aria-hidden="true"></span>&nbsp;
                     </button>*/}
                    <button className="btn btn-default" type="submit">
                        <span className="glyphicon glyphicon-search " aria-hidden="true"></span>&nbsp;
                    </button>
                </span>
            </div>
        </form>
    );
};