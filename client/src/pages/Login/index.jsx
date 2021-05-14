import { Input, Row, Col, Form, Button } from "antd";

import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

import "./styles.scss";

const Login = ({ authStore }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const onFinish = () => {
    const payload = {
      phone: phone,
      password: password,
    };
    authStore.login(payload).then(() => history.replace("/"));
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <div className="login">
      <Header />
      <div className="container">
        <Form name="basic" onFinish={onFinish} size="large" {...layout}>
          <Row className="login-block">
            <Col span={24}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please input your phone!" },
                ]}
              >
                <Input onChange={(v) => setPhone(v.target.value)} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password onChange={(v) => setPassword(v.target.value)} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item className="sign-in-btn">
                <Button htmlType="submit">Sign in</Button>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item className="sign-up-link">
                <Link to="/auth/registration" style={{ color: "#f38f00" }}>
                  Create account
                </Link>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Login;
