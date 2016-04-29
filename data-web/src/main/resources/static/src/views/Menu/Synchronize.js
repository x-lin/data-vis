import React from "react";

const Synchronize = ({ synchronize }) => {
    return <a href="#" title="Synchronize" onClick={() => synchronize()}><span className="fa fa-refresh" /></a>;
};

Synchronize.propTypes = {
    synchronize: React.PropTypes.func.isRequired
};

export default Synchronize;
