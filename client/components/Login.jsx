import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (username === "" || password === "") {
      setIsLoading(false);
      return;
    }

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log(data);
    if (data.message === "Login successful") {
      navigate("/Home", { state: { username } });
    } else {
      console.error("User not found");
    }

    setIsLoading(false);
  };

  return (
    <>
      <form className="card w-70">
        <div className="card-body">
          <input
            placeholder="username"
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
          <label className="label cursor-pointer">
            Accept terms of use
            <input type="checkbox" className="toggle" />
          </label>
          <label className="label cursor-pointer">
            Submit to newsletter
            <input type="checkbox" className="toggle" />
          </label>
          <button className="btn" onClick={handleLogin}>
            <span
              className={`loading-spinner ${isLoading ? "loading" : ""}`}
            ></span>
            {isLoading ? "" : "Log in"}
          </button>
        </div>
        <button onClick={() => navigate("/Register")}>Sign in</button>
      </form>
    </>
  );
}

export default Login;
