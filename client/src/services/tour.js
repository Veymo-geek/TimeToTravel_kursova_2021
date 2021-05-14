import { getRequest, postRequest } from "../utils/api";

export default {
  async getTours() {
    try {
      const { data } = await getRequest("tour");
      return data;
    } catch (e) {
      console.error(e);
    }
  },

  async bookTour(userId, tourId) {
    try {
      const { data } = await postRequest("order", { userId, tourId });
      return data;
    } catch (e) {
      console.error(e);
    }
  },
};
