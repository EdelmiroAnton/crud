import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000/users/";

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    id: "",
    first_name: "",
    last_name: "",
    age: "",
    email: "",
  });

  // GET USERS
  const getUsers = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setUsers(response.data);
    } catch (err) {
      console.error(`Error message: ${err}`);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  //CREATE USERS
  const handleCreateUsers = async () => {
    try {
      const response = await axios.post(`${BASE_URL}add`, newUser);
      console.log(response.data);
    } catch (err) {
      alert(`${err}. Please try again in a few minutes.`);
      console.error(`Error message: ${err}`);
    }
    getUsers();
  };

  //UPDATE USERS
  const handleUpdateUsers = async (id, first_name, last_name, age, email) => {
    const updateFirstName = prompt("Update First Name", first_name);
    const updateLastName = prompt("Update Last Name", last_name);
    const updateAge = prompt("Update Age", age);
    const updateEmail = prompt("Update Email", email);
    if (
      updateFirstName !== first_name ||
      updateLastName !== last_name ||
      updateAge !== age ||
      updateEmail !== email
    )
      try {
        await axios.put(`${BASE_URL}update/${id}`, {
          first_name: updateFirstName,
          last_name: updateLastName,
          age: Number(updateAge),
          email: updateEmail,
        });

        setUsers((prevUser) => {
          console.log(prevUser);
          prevUser.map((user) => {
            user.id === id
              ? {
                  ...user,
                  first_name: updateFirstName,
                  last_name: updateLastName,
                  age: updateAge,
                  email: updateEmail,
                }
              : user;
          });
        });
      } catch (err) {
        console.error(`Error message: ${err}`);
      }
    getUsers();
  };

  //DELETE USERS
  const handleDeleteUsers = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete/${id}`);
    } catch (err) {
      console.log(err);
    }
    getUsers();
  };

  return (
    <>
      <div>
        {users &&
          users.map((user) => (
            <ul key={user.id}>
              <li>id: {user.id}</li>
              <li>{user.first_name}</li>
              <li>{user.last_name}</li>
              <li>{user.age}</li>
              <li>{user.email}</li>

              <button
                onClick={() =>
                  handleUpdateUsers(
                    user.id,
                    user.first_name,
                    user.last_name,
                    user.age,
                    user.email
                  )
                }
              >
                UPDATE
              </button>
              <button
                onClick={() => {
                  handleDeleteUsers(user.id);
                }}
              >
                DELETE
              </button>
            </ul>
          ))}
        <label htmlFor="new_name">Name</label>
        <input
          id="new_name"
          type="text"
          onChange={(e) =>
            setNewUser({ ...newUser, first_name: e.target.value })
          }
        />
        <label htmlFor="last_name">Last Name</label>
        <input
          id="last_name"
          type="text"
          onChange={(e) =>
            setNewUser({ ...newUser, last_name: e.target.value })
          }
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
      </div>
    </>
  );
};

export default App;
