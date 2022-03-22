import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import axios from "axios";
import styles from "./index.module.scss";
const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    navigate('/home')
    console.log("Success:", values);
    const res = await axios.post("http://127.0.0.1:8080/api/user/login", {
      user_id: values.user_id,
      password: values.password,
    });
    console.log(res, 'res')
    if(res && res.data && res.data.token) {
      localStorage.setItem('token', `Bearer ${res.data.token}`)
    }
  };

  // const fetchData = async () => {
  //   const res = await axios.get('http://127.0.0.1:8080/api/user')
  //   console.log(res)
  // }

  // useEffect( () => {
  //   fetchData()
  // }, [])
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
