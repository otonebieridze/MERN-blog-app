import { useForm } from "react-hook-form";
import styles from "./Create.module.css";
import IMG from "../../assets/img.jpg";
import axios from "axios";

import { useNavigate } from 'react-router-dom';

function Create() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    // imageeeeeeeeeee
    data.image = "image";
    
    axios.post("http://localhost:4000/api/blogs", data);
    navigate('/');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <img src={IMG} alt="blog-image" />

      <input
        {...register("title", { required: "This field is required!" })}
        aria-invalid={errors.title ? "true" : "false"}
        placeholder="Title"
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
