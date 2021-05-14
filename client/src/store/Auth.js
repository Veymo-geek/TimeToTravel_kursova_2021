import { makeAutoObservable } from "mobx";

import AuthService from "../services/auth";
import { setToken } from "../utils/localStorageManager";

export default class AuthStore {
  error = "";
  constructor() {
    makeAutoObservable(this);
  }

  login = async (payload) => {
    try {
      const { token } = await AuthService.login(payload);
      if (token) {
        setToken(token);
      }
    } catch (e) {
      console.error(e);
    }
  };

  registration = async (payload) => {
    try {
      this.error = "";
      const { token } = await AuthService.registration(payload);
      if (token) {
        setToken(token);
      }
    } catch (e) {
      this.error = e.message;
    }
  };
}
