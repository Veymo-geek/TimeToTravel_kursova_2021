import jwtDecode from "jwt-decode";

const apiUrl = `${process.env.REACT_APP_BASE_URL}/api`;

const authProvider = {
  login: ({ username, password }) => {
    const request = new Request(`${apiUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ phone: username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((auth) => {
        if (!auth.hasOwnProperty("token")) {
          throw new Error("Not authenticated");
        }
        const decodeJWT = jwtDecode(auth.token);
        if (
          decodeJWT.userRole === "admin" ||
          decodeJWT.userRole === "superadmin"
        ) {
          localStorage.removeItem("not_authenticated");
          localStorage.setItem("token", auth.token);
          localStorage.setItem("fullName", username);
        } else {
          throw new Error("Access Denied");
        }
      })
      .catch((e) => {
        throw new Error(e);
      });
  },
  logout: () => {
    localStorage.setItem("not_authenticated", true);
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    return Promise.resolve();
  },
  checkError: ({ status }) => {
    return status === 401 || status === 403
      ? Promise.reject()
      : Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem("not_authenticated")
      ? Promise.reject()
      : Promise.resolve();
  },
  getPermissions: () => {
    const jwt = localStorage.getItem("token");
    const decodeJWT = jwtDecode(jwt);
    if (decodeJWT.userRole) {
      return Promise.resolve(decodeJWT.userRole);
    }
  },
  getIdentity: () => {
    try {
      const fullName = localStorage.getItem("fullName");
      return Promise.resolve({ fullName });
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export { authProvider };
