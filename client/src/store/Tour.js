import { makeAutoObservable, runInAction } from "mobx";
import moment, { deprecationHandler } from "moment";

import TourService from "../services/tour";
import { getUserId } from "../utils/localStorageManager";

export default class TourStore {
  tours = [];
  filteredTours = [];

  constructor() {
    makeAutoObservable(this);
  }

  getTours = async () => {
    try {
      const { data } = await TourService.getTours();
      runInAction(() => {
        this.tours = JSON.parse(JSON.stringify(data));
        this.filteredTours = JSON.parse(JSON.stringify(data));
      });
    } catch (e) {
      console.error(e);
    }
  };

  bookTour = async (tourId) => {
    try {
      const userId = getUserId();
      console.log(userId);
      const { data } = await TourService.bookTour(userId, tourId);
      runInAction(() => {
        this.getTours();
      });
    } catch (e) {
      console.error(e);
    }
  };

  filterTours = async (place, rating, startDate, endDate) => {
    try {
      runInAction(() => {
        this.filteredTours = this.tours;
        if (place) {
          this.filteredTours = this.filteredTours.filter((item) => {
            return item.place === place;
          });
        }
        if (rating) {
          this.filteredTours = this.filteredTours.filter((item) => {
            return item.rating === rating;
          });
        }

        if (startDate) {
          this.filteredTours = this.filteredTours.filter((item) => {
            return moment(startDate).isSame(item.startDate, "day");
          });
        }
        if (endDate) {
          this.filteredTours = this.filteredTours.filter((item) => {
            return moment(endDate).isSame(item.endDate, "day");
          });
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
}
