import React from "react";
import { HashRouter } from "react-router-dom";
import router from "./router";
import styled from "styled-components";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <RouteContainer>{router}</RouteContainer>
    </HashRouter>
  );
}

const RouteContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: #fffffc;
`;

export default App;
