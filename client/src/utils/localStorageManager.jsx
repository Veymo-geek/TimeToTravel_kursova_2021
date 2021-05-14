import decode from "jwt-decode";

export const getAuthToken = () => {
  return localStorage.getItem("access_token");
};

export const getUserId = () => {
  if (getAuthToken()) {
    return decode(getAuthToken()).userId;
  }
  return null;
};

export const getUserRole = () => {
  if (getAuthToken()) {
    return decode(getAuthToken()).userRole;
  }
  return null;
};

export const setToken = (token) => {
  localStorage.setItem("access_token", token);
};

export const removeToken = () => {
  localStorage.removeItem("access_token");
};
