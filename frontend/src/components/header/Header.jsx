import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1>
          BLOG<b style={{ color: "red" }}>APP</b>
        </h1>
      </Link>
      <ul>
        <Link to="/" style={{ textDecoration: "none" }}>
          <li>ALL BLOGS</li>
        </Link>
        <Link to="/create" style={{ textDecoration: "none" }}>
          <li>CREATE BLOG</li>
        </Link>
      </ul>
    </header>
  );
}

export default Header;
