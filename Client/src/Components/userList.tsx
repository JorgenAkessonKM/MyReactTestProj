import { useState, useEffect } from "react";
import { getUsers } from "../Services/usersAPI";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers("/api/users").then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {(() => {
        if (loading) return <p>Loading...</p>;
        if (users == undefined) return <span>No Users received!</span>;
        else {
          return (
            <ul>
              {users.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          );
        }
      })()}
    </>
  );
}

export default UserList;
