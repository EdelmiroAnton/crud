import React, { useEffect, useState } from "react";
import { getdata } from "../helpers/fetchdata";
const UserName = () => {
  const [DBinfo, setDBinfo] = useState([]);

  useEffect(() => {
    getdata().then((resolve) => setDBinfo(resolve));
  }, []);
  return (
    <>
      <ul>
        {DBinfo.map((el) => (
          <li key={el.id}>{el.name}</li>
        ))}
      </ul>
    </>
  );
};

export default UserName;
