import axios from "axios";

export const API = axios.create({
  baseURL: "http://18.139.50.74:8080/",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};