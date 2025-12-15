import { useState, useEffect } from "react";
import { getUsers } from "../Services/usersAPI";
import getItems2 from "../Services/dataAPI2";

function UserList({ myUrl }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const serverUrl = myUrl;

  useEffect(() => {
    //getItems2(myUrl).then((data) => {
    getUsers().then((data) => {
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
