import React, { FC, useState } from "react";
import { Modal, Form, Input } from "antd";

interface AddUserProps {
  visible: boolean;
  closeModal: () => void;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const AddUser: FC<AddUserProps> = ({ visible, closeModal }) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Modal
      title="新增用户"
      visible={visible}
      onCancel={closeModal}
      confirmLoading={confirmLoading}
    >
      <Form {...formItemLayout} onFinish={onFinish}>
        <Form.Item
          label="用户名"
          name="user_id"
          hasFeedback
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          hasFeedback
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.Password allowClear />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          hasFeedback
          dependencies={["password"]}
          rules={[
            { required: true, message: "请输入确认密码!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次输入的密码不对！"));
              },
            }),
          ]}
        >
          <Input.Password allowClear />
        </Form.Item>
        <Form.Item
          label="电话"
          name="phone"
          hasFeedback
          rules={[
            { required: true, message: "请输入电话!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const reg = /^1[3456789]\d{9}$/;
                if (!value || reg.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("请输入正确的电话号码！"));
              },
            }),
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          hasFeedback
          rules={[
            { required: true, message: "请输入邮箱!" },
            { type: "email", message: "请输入正确的邮箱" },
          ]}
        >
          <Input allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUser;
