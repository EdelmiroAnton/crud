import React, { useState, useEffect } from "react";
import UserName from "./components/UserName";
import UserLastname from "./components/UserLastname";

const App = () => {
  return (
    <>
      <h1>Data Base Information</h1>
      <UserName />
      <UserLastname />
    </>
  );
};

export default App;
