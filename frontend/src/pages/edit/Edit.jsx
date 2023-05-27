import { useForm } from "react-hook-form";
import styles from "./Edit.module.css";
import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import emptyImage from "../../assets/empty-img.jpg";

function Edit({ blogsData }) {
  const { id } = useParams();
  const blog = blogsData.find((item) => item._id === id);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { ...blog },
  });

  const [blogImage, setBlogImage] = useState("");
  const [blogImage2, setBlogImage2] = useState(null);
  const [isformEdited, setIsFormEdited] = useState(false);
  const navigate = useNavigate();

  // Update a blog
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("description", data.description);
    formData.append("category", data.category);
    blogImage2 !== null && formData.append("image", blogImage2); 

    axios.patch(`https://mern-blog-app-server-production.up.railway.app/api/blogs/${id}`, formData);
    navigate("/");
  };

  // Delete a blog
  function handleDelete() {
    axios.delete(`https://mern-blog-app-server-production.up.railway.app/api/blogs/${id}`);
    navigate("/");
  }

  // upload or change image
  function handleImageUpload(e) {
    const file = e.target.files[0];
    setBlogImage2(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setBlogImage(reader.result);
    };
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <img
        src={
          blogImage === ""
            ? blog.image === "" || !blog.image
              ? emptyImage
              : `https://mern-blog-app-server-production.up.railway.app/${blog.filePath}`
            : blogImage
        }
        alt="blog-image"
      />

      {isformEdited && (
        <div style={{
          width: "100%",
          height: "40px",
          display: "flex",
          justifyContent: "center"
        }}>
          <input
            type="file"
            accept="image/*"
            id="fileinput"
            {...register("image")}
            aria-invalid={errors.image ? "true" : "false"}
            className={styles["image-upload-inp"]}
            onChange={(e) => handleImageUpload(e)}
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("fileinput").click();
            }}
            className={styles["image-upload-button"]}
          >
            {blog.image === "" || !blog.image ? "Upload " : "Change "}Image
          </button>
        </div>
      )}
      <br />
      {isformEdited && errors.image && (
        <span role="alert" className={styles["error-message"]}>
          {errors.image?.message}
        </span>
      )}

      {isformEdited ? (
        <select
          {...register("category", { required: "This field is required!" })}
          aria-invalid={errors.category ? "true" : "false"}
          defaultValue=""
        >
          <option disabled value="">
            Select Category
          </option>
          <option value="business">Business/corporate</option>
          <option value="travel">Travel</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="food">Food</option>
          <option value="sport">Sport</option>
          <option value="other">Other</option>
        </select>
      ) : (
        <h3>#{blog?.category}</h3>
      )}
      {errors.category && (
        <span role="alert" className={styles["error-message"]}>
          {errors.category?.message}
        </span>
      )}

      {isformEdited ? (
        <input
          {...register("title", { required: "This field is required!" })}
          aria-invalid={errors.title ? "true" : "false"}
          placeholder="Title"
          className={styles["text-input"]}
        />
      ) : (
        <h2>{blog?.title}</h2>
      )}
      {errors.title && (
        <span role="alert" className={styles["error-message"]}>
          {errors.title?.message}
        </span>
      )}

      {isformEdited ? (
        <textarea
          {...register("description", { required: "This field is required!" })}
          aria-invalid={errors.description ? "true" : "false"}
          placeholder="Description"
        />
      ) : (
        <p>{blog?.description}</p>
      )}
      {errors.description && (
        <span role="alert" className={styles["error-message"]}>
          {errors.description?.message}
        </span>
      )}

      {isformEdited ? (
        <input
          {...register("author", { required: "This field is required!" })}
          aria-invalid={errors.author ? "true" : "false"}
          placeholder="Author"
          className={styles["text-input"]}
        />
      ) : (
        <h4>Author: {blog?.author}</h4>
      )}
      {errors.author && (
        <span role="alert" className={styles["error-message"]}>
          {errors.author?.message}
        </span>
      )}

      {isformEdited && (
        <button type="submit" className={styles["submit-btn"]}>
          Update
        </button>
      )}
      {!isformEdited && (
        <div className={styles["buttons-container"]}>
          <button
            className={styles["edit-btn"]}
            type="button"
            onClick={() => setIsFormEdited(true)}
          >
            Edit
          </button>
          <button
            className={styles["delete-btn"]}
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </form>
  );
}

export default Edit;
