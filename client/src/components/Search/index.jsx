import React, { useState } from "react";
import { Row, Col, Button, Input, DatePicker, InputNumber, Select } from "antd";

import "./styles.scss";
import { useInput } from "../../utils/hooks";

const { Option } = Select;

const Search = ({ tourStore }) => {
  const place = useInput("");
  const [rating, setRating] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onClickSearch = () => {
    tourStore.filterTours(place.value, rating, startDate, endDate);
  };

  return (
    <div className="search">
      <Row justify="space-between" align="middle" gutter={[12, 12]}>
        <Col xs={24} lg={5}>
          <Input {...place} placeholder="Place" allowClear />
        </Col>
        <Col xs={24} lg={5}>
          <InputNumber
            max={5}
            min={0}
            step={0.5}
            onChange={setRating}
            placeholder="Rating(count of stars)"
          />
        </Col>
        <Col xs={12} lg={5}>
          <DatePicker onChange={setStartDate} placeholder="Start date" />
        </Col>
        <Col xs={12} lg={5}>
          <DatePicker onChange={setEndDate} placeholder="End date" />
        </Col>
        <Col xs={24} lg={4}>
          <Button onClick={onClickSearch}>Search</Button>
        </Col>
      </Row>
    </div>
  );
};

export default Search;
