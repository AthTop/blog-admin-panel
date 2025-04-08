import { NavLink } from "react-router";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

function Navbar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={styles.navbar}>
      <div>Admin Panel</div>
      <nav className={styles.nav}>
        <NavLink to="/" end>
          Home
        </NavLink>
        {currentUser && currentUser.role === "admin" && (
          <NavLink to="posts">Posts</NavLink>
        )}
        <div className={styles.auth}>
          {currentUser && (
            <>
              <p>Hello, {currentUser.user}</p>
              <p>Role: {currentUser.role}</p>
              <NavLink to="/logout" end>
                Logout
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
