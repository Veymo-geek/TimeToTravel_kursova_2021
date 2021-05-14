import React from "react";
import { Row, Col, Card, Tag, Button, Image } from "antd";

import "./styles.scss";

const TourItem = (props) => {
  const { cardTitle, content, onClickBook, id } = props;

  return (
    <div className="tour-item">
      <Row justify="space-between" align="middle">
        <Col>
          <Card title={cardTitle}>
            <div className="content-card">{content}</div>
            <Button onClick={() => onClickBook(id)}>Book tour</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TourItem;
