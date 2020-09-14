import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import Details from "./Details";
import SearchParams from "./SearchParams";
import Admin from "./Admin";
import ThemeContext from "./ThemeContext";
import { FeatureContextProvider } from "./feature/FeatureContext";
import { getFeatureFlagByName } from "./feature/FeatureApi";

const App = () => {
  const [theme, setTheme] = useState("");

  async function getFeatureTheme() {
    const { data } = await getFeatureFlagByName("dark");
    if (data && data.IsActive === "true") {
      setTheme(data.Feature);
    }
  }

  useEffect(() => {
    getFeatureTheme();
  }, [theme]);
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <FeatureContextProvider>
        <div>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
            <Admin path="/admin" />
          </Router>
        </div>
      </FeatureContextProvider>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
