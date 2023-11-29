import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("ESTUDIANTE");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(username, password, email, role);

    if (username === "" || password === "" || email === "") {
      setIsLoading(false);
      return;
    }

    const response = await fetch("http://localhost:3000/login/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email, role }),
    });

    const data = await response.json();
    console.log(data);

    if (data.message === "User created successfully") {
      console.log("Registration successful");
      navigate("/");
    } else {
      console.error("Error creating user");
    }

    setIsLoading(false);
  };

  return (
    <>
      <form className="card w-70">
        <div className="card-body">
          <input
            placeholder="Username"
            type="text"
            className="input input-bordered"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            type="password"
            className="input input-bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            placeholder="Email"
            type="email"
            className="input input-bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="label cursor-pointer">
            Select role:
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input input-bordered"
            >
              <option value="ESTUDIANTE">Estudiante</option>
              <option value="DOCENTE">Docente</option>
            </select>
          </label>
          <label className="label cursor-pointer">
            Accept terms of use
            <input type="checkbox" className="toggle" />
          </label>
          <label className="label cursor-pointer">
            Submit to newsletter
            <input type="checkbox" className="toggle" />
          </label>
          <button className="btn" onClick={handleRegister}>
            <span
              className={`loading-spinner ${isLoading ? "loading" : ""}`}
            ></span>
            {isLoading ? "" : "Register"}
          </button>
        </div>
        <button onClick={() => navigate("/")}>
          Already have an account? Login
        </button>
      </form>
    </>
  );
}

export default Register;
