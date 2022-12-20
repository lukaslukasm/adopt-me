import { render } from "react-dom";
import { StrictMode, useState } from "react";
import SearchParams from "./SearchParams";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import WrappedDetails from "./Details";
// import MyComponent from './MyComponent'
import ThemeContext from "./ThemeContext";

function App() {
  const theme = useState("#000");

  return (
    <StrictMode>
      <ThemeContext.Provider value={theme}>
        <BrowserRouter>
          {/* <MyComponent /> */}
          <header>
            <Link to="/">
              <h1>Adopt Me</h1>
            </Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<WrappedDetails />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </StrictMode>
  );
}

render(<App />, document.getElementById("root"));
