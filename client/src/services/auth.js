import { postRequest } from "../utils/api";

export default {
  async login(payload) {
    try {
      const { data } = await postRequest("auth/login", payload);
      return data;
    } catch (e) {
      console.error(e);
    }
  },

  async registration(payload) {
    try {
      const { data } = await postRequest("auth/registration", payload);
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
