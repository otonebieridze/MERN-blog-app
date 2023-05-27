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
        <li>
          <Link
            className={styles.link}
            to="/"
            style={{ textDecoration: "none" }}
          >
            ALL BLOGS
          </Link>
        </li>
        <li>
          <Link
            className={styles.link}
            to="/create"
            style={{ textDecoration: "none" }}
          >
            CREATE BLOG
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
