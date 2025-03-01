import React, { useEffect, useState } from "react";
import { fetchdata } from "../helpers/fetchdata";

const UserLastname = () => {
  const [DBinfo, setDBinfo] = useState([]);
  useEffect(() => {
    fetchdata().then((res) => setDBinfo(res));
  }, []);
  return (
    <ul>
      {DBinfo.map((el) => (
        <li key={el.id}>{el.lastname}</li>
      ))}
    </ul>
  );
};

export default UserLastname;
