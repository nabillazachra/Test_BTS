import React, { useState, useContext } from "react";
import { Form, Alert, Container } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import { API, setAuthToken } from "../config/api";
import { useNavigate } from "react-router";

export default function Login() {
    const navigate = useNavigate()

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/login", body, config);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data.token,
      });

      localStorage.setItem("token", response.data.data.token);
      setAuthToken(response.data.data.token);
      navigate("/check-list")

      const alert = (
        <Alert variant="success" className="py-1">
          Login success
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };
    return (
        <>
            <Container>
            {message && message}
                <Form onSubmit={handleLoginSubmit}>
                <Form.Group className="mb-3">
                <Form.Control
                    onChange={handleChange}
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    placeholder="Username"
                />
                </Form.Group>
                <Form.Group className="mb-4">
                <Form.Control
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    placeholder="Password"
                />
                </Form.Group>
                <button className="btn-reg auto w-100 mb-3" type="submit">
                Login
                </button>
                <p className="text-center">
                Don't have an account? Klik
                <span className="fw-bold p-e" >
                    &nbsp;Here
                </span>
                </p>
                </Form>
            </Container>
        </>
    )
}
