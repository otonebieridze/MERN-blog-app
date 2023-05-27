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
  const [blogImage, setBlogImage] = useState(null);
  const [blogImage2, setBlogImage2] = useState(null);

  const navigate = useNavigate();

  // Add a new blog
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("image", blogImage2); 
  
    try {
      await axios.post("https://mern-blog-app-server-production.up.railway.app/api/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });      
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  
  // upload or change image
  function handleImageUpload(e) {
    const file = e.target.files[0];
    setBlogImage2(file)

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setBlogImage(reader.result);
    };
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {blogImage !== null ? (
        <img src={blogImage} alt="blog-image" />
      ) : (
        <img src={emptyImg} alt="empty-image" />
      )}
      <div
        style={{
          width: "100%",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px"
        }}
      >
        <input
          type="file"
          accept="image/*"
          id="fileinput"
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
          {blogImage !== null ? "Change " : "Upload "}Image
        </button>
      </div>

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
        <option value="business">Business/corporate</option>
        <option value="travel">Travel</option>
        <option value="lifestyle">Lifestyle</option>
        <option value="food">Food</option>
        <option value="sport">Sport</option>
        <option value="other">Other</option>
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
