import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  Input,
  Row,
  Col,
  Form,
  Button,
  Select,
  InputNumber,
  message,
} from "antd";

import Header from "../../components/Header";
import { useInput } from "../../utils/hooks";
import { getAuthToken } from "../../utils/localStorageManager";

import "./styles.scss";

const Registration = ({ authStore }) => {
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const password = useInput("");
  const confirmPassword = useInput("");
  const [phone, setPhone] = useState();

  const history = useHistory();

  const onFinish = () => {
    const payload = {
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phone,
      password: password.value,
    };
    console.log(payload);
    authStore.registration(payload).then((data) => {
      if (authStore.error) {
        message.error(authStore.error);
      } else if (getAuthToken()) history.replace("/");
    });
  };

  return (
    <div className="registration">
      <Header />
      <div className="container">
        <Form size="large" name="basic" onFinish={onFinish}>
          <Row className="registration-block">
            <Col span={24}>
              <Form.Item
                label="First name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                ]}
              >
                <Input {...firstName} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Last name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                  },
                ]}
              >
                <Input {...lastName} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: "Please input age!" }]}
              >
                <Input onChange={(w) => setPhone(w.target.value)} />
              </Form.Item>
            </Col>
            <Col span={24}>
              {" "}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input {...email} />
              </Form.Item>
            </Col>
            <Col span={24}>
              {" "}
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password {...password} />
              </Form.Item>
            </Col>

            <Col span={24}>
              {" "}
              <Form.Item
                label="Confirm password"
                name="confirmPassword"
                rules={[
                  { required: true, message: "Please input your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password {...confirmPassword} />
              </Form.Item>
            </Col>
            <Col span={6} className="sign-in-link">
              <Link to="/auth/login" style={{ color: "#f38f00" }}>
                Sign in
              </Link>
            </Col>
            <Col span={18}>
              <Form.Item>
                <Button className="sign-up-btn" htmlType="submit">
                  Sign up
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
