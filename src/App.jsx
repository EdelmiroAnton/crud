import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000/users/";

const App = () => {
  const [user, setUser] = useState([]);
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
        console.error(`Error message: ${err}`);
      }
    };
    getUsers();
  }, [newUser]);

  //CREATE USERS
  const handleCreateUsers = async () => {
    try {
      const response = await axios.post(`${BASE_URL}add`, newUser);
      console.log(response.data);
    } catch (err) {
      console.error(`Error message: ${err}`);
    }
  };

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

      <label htmlFor="new_name">Name</label>
      <input
        id="new_name"
        type="text"
        onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
      />
      <label htmlFor="last_name">Last Name</label>
      <input
        id="last_name"
        type="text"
        onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
      />

      <label htmlFor="age">Age</label>
      <input
        id="age"
        type="number"
        onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />

      <button onClick={handleCreateUsers}>CREATE</button>
    </>
  );
};

export default App;
