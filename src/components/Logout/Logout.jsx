import { useNavigate } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";
import { useEffect, useContext } from "react";

export const Logout = () => {
  const { setCurrentUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const clearStorage = () => {
      localStorage.removeItem("jwToken");
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
      setToken(null);
    };
    clearStorage();
    navigate("/");
  });

  return null;
};
