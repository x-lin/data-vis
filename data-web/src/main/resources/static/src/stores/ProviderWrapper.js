import React from "react";
import { Provider } from "react-redux";
import { store } from "./ReduxStore";

const ProviderWrapper = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

ProviderWrapper.propTypes = {
    children: React.PropTypes.element.isRequired
};

export default ProviderWrapper;
