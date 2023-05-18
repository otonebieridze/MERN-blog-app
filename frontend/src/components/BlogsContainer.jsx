import axios from "axios";
import React, { useState, useEffect } from "react";
import Blog from "../components/Blog";
import Modal from "./Modal";

function BlogsContainer() {
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/blogs")
      .then((response) => {
        setBlogsData(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [blogsData]);

  return (
    <div className="flex">
      <div className="w-80 flex flex-col items-center">
        <button
          className="w-52 h-9 bg-blue-700 rounded text-white text-base mt-6"
          onClick={() => setShowModal(true)}
        >
          ADD BLOG
        </button>

        <div className="w-full h-10 border flex items-center cursor-pointer mt-6">
          <p className="text-left ml-4">All Categories</p>
        </div>
        <div className="w-full h-10 border flex items-center cursor-pointer">
          <p className="text-left ml-4">Sports</p>
        </div>
        <div className="w-full h-10 border flex items-center cursor-pointer">
          <p className="text-left ml-4">Movies</p>
        </div>
        <div className="w-full h-10 border flex items-center cursor-pointer">
          <p className="text-left ml-4">Music</p>
        </div>
        <div className="w-full h-10 border flex items-center cursor-pointer">
          <p className="text-left ml-4">Tech</p>
        </div>
      </div>

      <div className="w-full flex flex-wrap">
        {loading === true ? <h1>Loading...</h1> : blogsData.map((blog) => (
          <Blog key={blog._id} blog={blog} />
        ))}
      </div>

      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

export default BlogsContainer;
