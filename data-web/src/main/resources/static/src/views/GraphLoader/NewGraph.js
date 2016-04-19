import React from "react";

const NewGraph = ({ handleClick }) => {
    return <a title="Create New Graph" onClick={() => handleClick()}><i className="fa fa-file-o" /></a>;
};

NewGraph.propTypes = {
    handleClick: React.PropTypes.func.isRequired
};

export default NewGraph;
