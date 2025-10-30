import { useState, useEffect } from "react";

export default function ManageUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://localhost:44360/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <>
      <h2>Manage User</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}
