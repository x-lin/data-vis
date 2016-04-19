import React from "react";

import Constants from "../../config/Constants";

const TestCoverageHeader = ({ type, name, setPanelInvisible }) => {
    return (
        <div className="box-header with-border">
            <p>
                <span className="label label-default">Test Coverage</span>&nbsp;
                { type &&
                    <span className="label"
                      style={{
                          backgroundColor: Constants.getColor(type),
                          color: Constants.getContrastColor(Constants.getColor(type))
                      }}
                    >
                        {type}
                    </span>
                }
            </p>
            <h3 className="box-title">
                <strong>{name}</strong>
            </h3>
            <div className="box-tools pull-right">
                <button className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="">
                    <span className="fa fa-minus" />
                </button>
                <button type="button" className="btn btn-box-tool" onClick={() => setPanelInvisible()}>
                    <span className="fa fa-times" />
                </button>
            </div>
        </div>
    );
};

TestCoverageHeader.propTypes = {
    name: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]).isRequired,
    type: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    setPanelInvisible: React.PropTypes.func.isRequired
};

export default TestCoverageHeader;
