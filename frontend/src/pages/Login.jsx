import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    await login(username, password);
    navigate("/");
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <form onSubmit={handleLogin}>
        <label>
          UserName: <input name="username" type="text" />
        </label>
        <br />
        <label>
          Password: <input name="password" type="password" />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
