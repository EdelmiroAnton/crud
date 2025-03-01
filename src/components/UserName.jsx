import React, { useEffect, useState } from "react";
import { fetchdata } from "../helpers/fetchdata";

const UserName = () => {
  const [DBinfo, setDBinfo] = useState([]);

  useEffect(() => {
    fetchdata().then((resolve) => setDBinfo(resolve));
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
