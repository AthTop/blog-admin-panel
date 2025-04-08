import { useState, useContext } from "react";
import { loginRequest } from "../../utils/api";
import styles from "./Login.module.css";
import { AuthContext } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router";

function Login() {
  const [error, setError] = useState();
  const { setCurrentUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const onLogin = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    const loginResponse = await loginRequest(username, password);
    if (!loginResponse.success) {
      setError(loginResponse.validationErrors);
      return;
    }
    const user = { user: loginResponse.user, role: loginResponse.userRole };
    localStorage.setItem("jwToken", loginResponse.token);
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
    setToken(loginResponse.token);
    setError();
    navigate("/");
  };

  return (
    <div className={styles.wrapper}>
      <span>{error}</span>
      <form action={onLogin}>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username"></input>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default Login;
