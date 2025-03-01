import React, { useState, useEffect } from "react";
import UserName from "./components/UserName";
import UserLastname from "./components/UserLastname";
import UserAge from "./components/UserAge";

const App = () => {
  return (
    <>
      <h1>Data Base Information</h1>
      <UserName />
      <UserLastname />
      <UserAge />
    </>
  );
};

export default App;
