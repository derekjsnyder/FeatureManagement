import React, {  useState } from "react";

const FeatureContext = React.createContext([{}, () => {}]);

const FeatureContextProvider = (props) => {
    const [feature, setFeature] = useState({});

    return (
        <FeatureContext.Provider value={[feature, setFeature]}>
            {props.children}
        </FeatureContext.Provider>
    );
};


export {FeatureContext, FeatureContextProvider};
