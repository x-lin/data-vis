var React = require("react");
import Router from "react-router";
import { Link } from "react-router";

class Main extends React.Component{ //creates react component
    //pushState() {
    //    this.props.history.pushState(null, "/relationships/");
    //};

    render() {
        return (
            <div>
                <div className="navbar navbar-default navbar-xs  navbar-static-top" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            {/*<a className="navbar-brand" href="#/"></a>
                            for dropdown menu on passing under a width threshold*/}
                            <button type="button" className="navbar-toggle">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>

                        <div className="navbar-collapse collapse" bs-active-link>
                            <ul className="nav navbar-nav">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/relationships">Relationships</Link></li>
                                <li><Link to="/">Timeline</Link></li>
                                <li><Link to="/">Graph Editor</Link></li>
                                <li><Link to="/">Statistics</Link></li>
                            </ul>

                            {/*Right side links
                            <ul className="nav navbar-nav navbar-right hidden-md hidden-sm hidden-xs">-->
                            </ul>*/}
                        </div>
                    </div>
                </div>
                <div className="nopadding">
                    {this.props.children}
                </div>
            </div>
        )
    }
};

export default Main;