import React from "react";

import { Typeahead } from "react-typeahead";

class Search extends React.Component {
    search() {
        console.log("search clicked");
    };

    render() {
        return (
            <div className="row search-container">
                <form onSubmit={() => this.search()}>
                    <div className="input-group">
                        <div className="input-group-btn">
                            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Testme <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu">
                                <li><a href="#">Project</a></li>
                                <li><a href="#">Ticket</a></li>
                                <li><a href="#">User</a></li>
                            </ul>
                        </div>

                        <Typeahead
                            options={["das", "ADSDG", "OLDASDF", "DGAHA", "SDGAh", "asdf"]}
                            maxVisible={2}
                            placeholder={"Enter search text..."}
                            customClasses={{
                              input: "form-control",
                              results: "testme-result"
                            }}
                        />

                        <span className="input-group-btn">
                            <button className="btn btn-default" ng-hide="loadedData">
                                <span className="glyphicon glyphicon-refresh glyphicon-spin" aria-hidden="true"></span>&nbsp;
                            </button>
                            <button className="btn btn-default" type="submit">
                                <span className="glyphicon glyphicon-search" aria-hidden="true"></span>&nbsp;
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        );
    };
}

export default Search;