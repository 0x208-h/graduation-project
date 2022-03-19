import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import axios from "axios";
import styles from "./index.module.scss";
const Login = () => {
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axios.get('http://127.0.0.1:8080/api/user')
    console.log(res)
  }

  useEffect( () => {
    fetchData()
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          className={styles.formContainer}
        >
          <Form.Item
            label="用户名"
            name="用户名"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="密码"
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
              onClick={() => navigate("/home")}
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
