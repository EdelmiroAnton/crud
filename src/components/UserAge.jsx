import React from "react";
import { fetchdata } from "../helpers/fetchdata";
import { useState, useEffect } from "react";

const UserAge = () => {
  const [DBinfo, setDBinfo] = useState([]);

  useEffect(() => {
    fetchdata().then((res) => setDBinfo(res));
  }, []);

  return (
    <ul>
      {DBinfo.map((el) => (
        <li key={el.id}>{el.age}</li>
      ))}
    </ul>
  );
};

export default UserAge;
