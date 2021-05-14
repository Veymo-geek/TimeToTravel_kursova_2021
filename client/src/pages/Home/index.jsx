import React, { useEffect } from "react";
import { Row, Col, Rate, message } from "antd";
import { observer } from "mobx-react-lite";
import moment from "moment";

import Header from "../../components/Header";
import Search from "../../components/Search";
import TourItem from "../../components/TourItem";
import { getAuthToken } from "../../utils/localStorageManager";

import "./styles.scss";

const Home = ({ tourStore }) => {
  useEffect(() => {
    tourStore.getTours();
  }, []);

  const onClickBook = (bookId) => {
    if (getAuthToken()) {
      tourStore.bookTour(bookId);
      message.success("Tour booked!");
    } else {
      message.error("You are not authorized!");
    }
  };

  const CardTitle = (props) => {
    const { place, price, rating, startDate, endDate } = props;
    return (
      <Row justify="space-between">
        <Col flex>
          <Row>
            <span>{place},</span>
            <span>
              ({moment(startDate).format("ll")} - {moment(endDate).format("ll")}
              )
            </span>
          </Row>

          <span style={{ fontWeight: "bold" }}>${price}</span>
        </Col>
        <Col flex>
          <Rate defaultValue={rating} allowHalf disabled />
        </Col>
      </Row>
    );
  };

  const NotFound = () => {
    return <div className="not-found">Not found</div>;
  };

  return (
    <div className="home">
      <Header />

      <div className="container">
        <Search tourStore={tourStore} />
        <Row
          justify="center"
          style={{
            color: "#f38f00",
            textTransform: "uppercase",
            fontSize: "36px",
          }}
        >
          Available tours
        </Row>
        {tourStore.filteredTours.length ? (
          tourStore.filteredTours.map((item) => {
            return (
              <TourItem
                cardTitle={<CardTitle {...item} />}
                content={item.description}
                id={item._id}
                onClickBook={onClickBook}
              />
            );
          })
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  );
};

export default observer(Home);
