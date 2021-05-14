import axios from "axios";

const API_URL = `${process.env.REACT_APP_SERVER_URI}/api`;

export const getRequest = async (endpoint) => {
  return await axios.get(`${API_URL}/${endpoint}`);
};

export const getByIdRequest = async (endpoint, id) => {
  return await axios.get(`${API_URL}/${endpoint}/${id}`);
};

export const postRequest = async (endpoint, payload) => {
  return await axios.post(`${API_URL}/${endpoint}`, payload);
};

export const putRequest = async (endpoint, id, payload) => {
  return await axios.put(`${API_URL}/${endpoint}/${id}`, payload);
};

export const deleteRequest = async (endpoint, id) => {
  return await axios.delete(`${API_URL}/${endpoint}/${id}`);
};
