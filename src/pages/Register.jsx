import React, { useState } from "react";
import { Modal, Form, Alert, Container } from "react-bootstrap";

import { API } from "../config/api";

export default function Register() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        username: "",
      });
    
      const [message, setMessage] = useState(null);
      const { username, email, password } = form;
    
      const handleChange = async (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleRegistSubmit = async (e) => {
        try {
          e.preventDefault();
    
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          const body = JSON.stringify(form);
    
          const response = await API.post("/register", body, config);
    
          if (response.data.statusCode === 2000) {
            const alert = (
              <Alert variant="success" className="py-1">
                Register success, you can login now
              </Alert>
            );
            setMessage(alert);
          } else {
            const alert = (
              <Alert variant="danger" className="py-1">
                Register Failed please fill it correctly
              </Alert>
            );
            setMessage(alert);
          }
        } catch (error) {
          const alert = (
            <Alert variant="danger" className="py-1">
              Failed
            </Alert>
          );
          setMessage(alert);
        }
      };
    return (
        <div>
            <Container>
            {message && message}
          <Form onSubmit={handleRegistSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={handleChange}
                name="email"
                value={email}
                type="email"
                id="email"
                placeholder="Email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={handleChange}
                name="password"
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                onChange={handleChange}
                name="username"
                type="username"
                id="username"
                value={username}
                placeholder="username"
                required
              />
            </Form.Group>
            <button className="btn-reg auto w-100 mb-3" type="submit">
              Register
            </button>
            <p className="text-center">
              Already have an account? Klik
              <span className="fw-bold p-e">
                &nbsp;Here
              </span>
            </p>
          </Form>
          </Container>
        </div>
    )
}
