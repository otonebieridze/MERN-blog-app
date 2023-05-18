import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Modal as ModalBootstrap, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Modal({ showModal, setShowModal }) {
  const handleClose = () => setShowModal(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    axios.post("http://localhost:4000/api/blogs", data);
    handleClose();
    reset();
  };

  return (
    <div>
      <ModalBootstrap show={showModal} onHide={handleClose}>
        <ModalBootstrap.Header>
          <ModalBootstrap.Title>Add Blog</ModalBootstrap.Title>
        </ModalBootstrap.Header>
        <ModalBootstrap.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder="Enter title"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-red-600">This field is required</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                placeholder="Enter author"
                {...register("author", { required: true })}
              />
              {errors.author && (
                <span className="text-red-600">This field is required</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder="Enter description"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <span className="text-red-600">This field is required</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                placeholder="Upload image"
                {...register("image", { required: true })}
              />
              {errors.image && (
                <span className="text-red-600">This field is required</span>
              )}
            </Form.Group>
          </Form>
        </ModalBootstrap.Body>
        <ModalBootstrap.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className=" bg-gray-500"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit(onSubmit)}
            className=" bg-blue-500"
          >
            Publish
          </Button>
        </ModalBootstrap.Footer>
      </ModalBootstrap>
    </div>
  );
}

export default Modal;
