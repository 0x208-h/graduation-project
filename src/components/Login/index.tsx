import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { fetch } from "@/utils/axios";
import styles from "./index.module.scss";

interface LoginResponse {
  token?: string;
  message?: string;
  user_id?: string;
  status?: number;
  statusText?: "success" | "fail";
}

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const res = await fetch.post<LoginResponse>("/api/user/login", {
      user_id: values.user_id,
      password: values.password,
    });

    if (res && res.statusText === "success") {
      localStorage.setItem("token", `Bearer ${res.token}`);
      message.success(res.message);
      navigate("/home", { state: { user_id: res.user_id } });
    }
    if (res && res.statusText === "fail") {
      message.error(res.message);
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
            name="user_id"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password />
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
