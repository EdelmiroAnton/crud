import React, { use, useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000/users/";

//SHOW DDBB INFO

const App = () => {
  const [user, setUser] = useState([]);
  // const [newName, setNewName] = useState("")
  // const [newLastName, setLastNewName] = useState("")
  // const [NewAge, setNewAge] = useState("")
  // const [newemail, setNewEmail] = useState("")
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
  });

  // GET USERS
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(BASE_URL);
        setUser(response.data);
      } catch (err) {
        console.err(`Error message: ${err}`);
      }
    };
    getUsers();
  }, []);

  //CREATE USERS

  // const handleCreate = async (e) => {
  //   const results = await fetch(`${BASE_URL}add`, {
  //     method: "POST",
  //   });
  //   console.log(results);

  //   const data = await results.json({});
  //   first_name: newUser.first_name,
  //     // last_name: newUser.last_name,
  //     // age: newUser.age,
  //     // email: newUser.email,

  //     console.log(data);
  // };

  return (
    <>
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

      {/* <label htmlFor="new_name">New Name</label>
      <input
        id="new_name"
        type="text"
        onChange={(e) => setNewUser({ first_name: e.target.value })}
      />
      <button onClick={handleCreate}>CREATE</button> */}
    </>
  );
};

export default App;
