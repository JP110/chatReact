import React, { useState } from "react";

function Login({ onLogin }) {
  const [userName, setUserName] = useState("");

  const handleLogin = () => {
    if (userName.trim() !== "") {
      onLogin(userName);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Entrez votre nom"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}

export default Login;