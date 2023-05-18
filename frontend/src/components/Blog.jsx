import IMG from "../assets/bg.webp";
import axios from "axios";

function Blog({ blog }) {
  function removeBlog(id) {
    axios.delete(`http://localhost:4000/api/blogs/${id}`);
  }

  return (
    <div className="w-56 h-64 border ml-4 mt-4">
      <img src={IMG} alt="img" className="w-full h-28" />
      <h1>{blog.title}</h1>
      <p>{blog.description}</p>
      <p>{blog.author}</p>

      <hr />
      <button onClick={() => removeBlog(blog._id)}>Remove blog</button>
    </div>
  )
}

export default Blog;