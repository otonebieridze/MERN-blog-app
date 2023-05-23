import { useForm } from "react-hook-form";
import styles from "./Create.module.css";
import emptyImg from "../../assets/empty-img.jpg";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Create() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [blogImage, setBlogImage] = useState("");
  const navigate = useNavigate();

  // Add a new blog
  const onSubmit = (data) => {
    data.image = blogImage;
    axios.post("http://localhost:4000/api/blogs", data);
    navigate("/");
  };

  // upload or change image
  function handleImageUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setBlogImage(reader.result);
    };
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {blogImage !== "" ? (
        <img src={blogImage} alt="blog-image" />
      ) : (
        <img src={emptyImg} alt="empty-image" />
      )}
      <input
        type="file"
        accept="image/*"
        {...register("image")}
        aria-invalid={errors.image ? "true" : "false"}
        className={styles["image-upload-inp"]}
        onChange={(e) => handleImageUpload(e)}
      />

      <input
        {...register("title", { required: "This field is required!" })}
        aria-invalid={errors.title ? "true" : "false"}
        placeholder="Title"
        className={styles["text-input"]}
      />
      {errors.title && (
        <p role="alert" className={styles["error-message"]}>
          {errors.title?.message}
        </p>
      )}

      <input
        {...register("author", { required: "This field is required!" })}
        aria-invalid={errors.author ? "true" : "false"}
        placeholder="Author"
        className={styles["text-input"]}
      />
      {errors.author && (
        <p role="alert" className={styles["error-message"]}>
          {errors.author?.message}
        </p>
      )}

      <textarea
        {...register("description", { required: "This field is required!" })}
        aria-invalid={errors.description ? "true" : "false"}
        placeholder="Description"
      />
      {errors.description && (
        <p role="alert" className={styles["error-message"]}>
          {errors.description?.message}
        </p>
      )}

      <select
        {...register("category", { required: "This field is required!" })}
        aria-invalid={errors.category ? "true" : "false"}
        defaultValue=""
      >
        <option disabled value="">
          Select Category
        </option>
        <option value="movie">Movie</option>
        <option value="sport">Sport</option>
        <option value="music">Music</option>
      </select>
      {errors.category && (
        <p role="alert" className={styles["error-message"]}>
          {errors.category?.message}
        </p>
      )}

      <button type="submit" className={styles["submit-btn"]}>
        Create Blog
      </button>
    </form>
  );
}

export default Create;
