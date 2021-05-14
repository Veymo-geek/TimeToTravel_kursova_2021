import React, { useState } from "react";
import { Row, Col, Button, Image } from "antd";
import { Link, useHistory } from "react-router-dom";

import { getAuthToken, removeToken } from "../../utils/localStorageManager";

import "./styles.scss";

const Header = () => {
  const history = useHistory();
  const [isAuth, setAuth] = useState(!!getAuthToken());

  const onClickSignIn = () => {
    history.replace("/auth/login");
    removeToken();
    setAuth(false);
  };

  const onClickSignOut = () => {
    removeToken();
    setAuth(false);
  };

  const onClickSignUp = () => {
    history.replace("/auth/registration");
    removeToken();
    setAuth(false);
  };

  return (
    <div className="header">
      <div className="container">
        <Row justify="space-between" align="middle">
          <Link to={"/"} className="logo-link">
            <div className="logo-block">
              <div className="logo">T</div>
              <div className="logo-text">TimeToTravel</div>
            </div>
          </Link>
          <Col>
            {history.location.pathname === "/" ? (
              isAuth ? (
                <Button onClick={onClickSignOut}>Sign out</Button>
              ) : (
                <>
                  <Button type="primary" onClick={onClickSignIn}>
                    Sign in
                  </Button>{" "}
                  <Button onClick={onClickSignUp}>Sign up</Button>
                </>
              )
            ) : null}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Header;
