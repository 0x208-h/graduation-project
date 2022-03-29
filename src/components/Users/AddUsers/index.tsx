import React, { FC, useState } from "react";
import { Modal, Form, Input, message, Radio } from "antd";
import moment from "moment";
import { postApi } from "@/utils/axios";

interface AddUserProps {
  visible: boolean;
  closeModal: () => void;
  fetchData: () => void;
}
interface AddUserSubmitProps {
  username: string;
  password: string;
  phone: string;
  email: string;
  create_time: string;
  sex: number;
}

interface ValuesProps extends AddUserSubmitProps {
  confirmPassword?: string;
}

interface AddUserResponse {
  status?: number;
  statusText?: string;
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

const AddUser: FC<AddUserProps> = ({ visible, closeModal, fetchData }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const handleSubmit = async (data: AddUserSubmitProps) => {
    data = {
      ...data,
      create_time: moment().format('YYYY-MM-DD')
    }
    try{
      setConfirmLoading(true)
      const res = await postApi<AddUserResponse>('/user/add', data)
      if(res.status === 200) {
        message.success(res.statusText, 2)
        closeModal()
        fetchData()
      }
    }  catch (err) {
      message.error("添加用户失败", 2);
    } finally {
      setConfirmLoading(false);
    }
  };
  return (
    <Modal
      title="新增用户"
      visible={visible}
      onCancel={closeModal}
      confirmLoading={confirmLoading}
      getContainer={false}
      onOk={() => {
        form
          .validateFields()
          .then((values: ValuesProps) => {
            delete values.confirmPassword;
            handleSubmit(values)
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form {...formItemLayout} form={form}>
        <Form.Item
          label="用户名"
          name="username"
          hasFeedback
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="性别"
          name="sex"
          hasFeedback
          rules={[{ required: true, message: "请输入你的性别!" }]}
        >
            <Radio.Group>
            <Radio value={1}>男</Radio>
            <Radio value={0}>女</Radio>
          </Radio.Group>
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
            () => ({
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
