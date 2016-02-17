import React from "react";
import { connect } from "react-redux";
import { Tokenizer } from "react-typeahead";
import { getItem } from "../../actions/AJAXActions/GETItem";
import { getNeighbors } from "../../actions/AJAXActions/GETNeighbors";

class Search extends React.Component {
    setRef(ref) {
        this.it = ref;
    }

    search() {
        console.log("search value ", this.it.value);
        this.props.onSearchSubmit(this.it.value);
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

                        <input type="text" className="form-control" id="search" ref={(ref) => this.setRef(ref)}/>

                        <span className="input-group-btn ">
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

const mapStateToProps = (state) => {
    return {
        items: state.items
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        onSearchSubmit: (key) => {
            //TODO test with UNOMI-1
            dispatch(getNeighbors("Project", "UNOMI-2"));
        }
    };
};

const SearchConnect = connect(
    mapStateToProps,
    mapDispatchProps
)(Search);

export default SearchConnect;