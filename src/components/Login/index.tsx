import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { baseURL } from "@/utils/constant";
import styles from "./index.module.scss";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const result = await axios.post(`${baseURL}/user/login`, {
      username: values.username,
      password: values.password,
    });
    console.log(result, "result");
    const res = result.data.data;
    console.log(res, "res");
    if (res && res.statusText === "success") {
      sessionStorage.setItem("token", `Bearer ${res.token}`);
      sessionStorage.setItem("username", res.username);
      sessionStorage.setItem('permission', res.is_permission);
      message.success(res.message, 2);
      navigate("/home/welcome");
    }
    if (res && res.statusText === "fail") {
      message.error(res.message, 2);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          className={styles.formContainer}
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            hasFeedback
            rules={[{ required: true, message: "请输入用户名!" }]}
            initialValue="admin"
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
            initialValue="admin"
            hasFeedback
          >
            <Input.Password allowClear />
          </Form.Item>
          <Form.Item
            wrapperCol={{ offset: 6, span: 18 }}
            className={styles.btns}
          >
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitBtn}
            >
              登陆
            </Button>
            <Button type="default" htmlType="reset">
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
