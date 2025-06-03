import React, { useEffect, useState } from "react";

const BASE_URL = "http://localhost:3000/users/";

//SHOW DDBB INFO

const App = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const result = await fetch(BASE_URL);
        const data = await result.json();
        setUser(data);
        console.log(data);
      } catch (error) {
        console.log(
          `Error at getting users info. Error Message: ${error.message}`
        );
      }
    };
    getUsers();
  }, []);

  return (
    <div>
      {user.map((el) => (
        <ul key={el.id}>
          <li>{el.first_name}</li>
          <li>{el.last_name}</li>
          <li>{el.age}</li>
          <li>{el.email}</li>
        </ul>
      ))}
    </div>
  );
};

export default App;
