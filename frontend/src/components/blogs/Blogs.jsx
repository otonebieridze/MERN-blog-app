import styles from "./Blogs.module.css";
import { Link } from "react-router-dom";

import IMG from "../../assets/img.jpg";

function Blogs({ blogsData }) {
  return (
    <div className={styles["blogs-container"]}>
      {blogsData.map((item) => (
        <div className={styles["blog-item"]} key={item._id}>
            <Link to={`/edit/${item._id}`} style={{ textDecoration: "none" }}>
            <div style={{ flexGrow: 1 }}>
              <img src={IMG} alt="img" />
              <h3>#{item.category}</h3>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
            <h4>
              <span style={{ textTransform: "none" }}>Author: </span>
              {item.author}
            </h4>
        </Link>
          </div>
      ))}
    </div>
  );
}

export default Blogs;
