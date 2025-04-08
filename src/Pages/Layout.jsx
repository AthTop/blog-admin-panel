import Navbar from "../components/Navbar/Navbar";
import { AuthContext } from "../components/AuthContext/AuthContext";
import { useEffect, useContext } from "react";
import { Outlet } from "react-router";

export const Layout = () => {
  const { setCurrentUser, setToken } = useContext(AuthContext);

  useEffect(() => {
    const checkStorage = () => {
      const userToken = localStorage.getItem("jwToken");
      const currentUser = localStorage.getItem("currentUser");
      if (userToken && currentUser) {
        setCurrentUser(JSON.parse(currentUser));
        setToken(userToken);
      }
    };
    checkStorage();
  }, [setCurrentUser, setToken]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
