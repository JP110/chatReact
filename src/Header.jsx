// Header.jsx
import React, { useEffect, useState } from "react";
import "./Header.css";

function Header({ title, userList, onUserSelect }) {
  const [users, setUsers] = useState(userList);

  useEffect(() => {
    setUsers(userList);
  }, [userList]);

  const handleUserSelect = (event) => {
    const selectedUser = event.target.value;
    onUserSelect(selectedUser);
  };

  return (
    <div className="app_header">
      <h1>{title}</h1>
      <div className="user-dropdown">
        <span>Conversation avec : </span>
        <select onChange={handleUserSelect}>
          <option value="">Sélectionnez un utilisateur</option>
          {users && users.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Header;
