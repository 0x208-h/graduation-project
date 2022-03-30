import React, { useState, useEffect } from "react";
import { Card, Input, Form, Table, message, Button, Modal } from "antd";
import { UserAddOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { ColumnProps, TablePaginationConfig } from "antd/lib/table";
import moment from "moment";
import AddUser from "./AddUsers";
import { queryApi, deleteApi } from "@/utils/axios";
import styles from "./index.module.scss";

const { confirm } = Modal;

const initialValue = {
  pageNum: 1,
  pageSize: 10,
};

enum SEX_TYPE {
  WOMAN,
  MAN,
}

const sexType = [
  { code: SEX_TYPE.MAN, value: "男" },
  { code: SEX_TYPE.WOMAN, value: "女" },
];

interface GetAllUsersInfo {
  username?: string;
  pageNum?: number;
  pageSize?: number;
}

interface UsersInfoList {
  user_id: string;
  username: string;
  password: string;
  create_time: string;
  phone: string;
  email: string;
  sex: number;
}
interface UsersInfoData {
  total: number;
  pageNum: number;
  pageSize: number;
  list: UsersInfoList[];
}
interface UsersInfoResponse {
  status: number;
  pageInfo: UsersInfoData;
}

interface DeleteUserInfoResponse {
  status: number;
  statusText: string;
}

const Users = () => {
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [deleteBtnLoading, setDeleteBtnLoading] = useState<boolean>(false);
  const [tableList, setTableList] = useState<UsersInfoData>({
    total: 0,
    pageNum: 1,
    pageSize: 10,
    list: [],
  });
  const fetchData = async (data?: GetAllUsersInfo) => {
    const params = {
      ...initialValue,
      ...data,
    };
    try {
      setTableLoading(true);
      const res = await queryApi<UsersInfoResponse>(`/user/all`, params);
      if (res.status === 200) {
        setTableList(res.pageInfo);
      }
    } catch (err) {
      message.error("用户接口错误", 2);
    } finally {
      setTableLoading(false);
    }
  };

  function showDeleteConfirm(id: string) {
    confirm({
      title: "你确定要删除该用户吗？",
      icon: <ExclamationCircleOutlined />,
      okText: "确定",
      okButtonProps: { disabled: deleteBtnLoading },
      okType: "danger",
      cancelText: "取消",
      async onOk() {
        try {
          setDeleteBtnLoading(true);
          const res = await deleteApi<DeleteUserInfoResponse>(`user/${id}`);
          if (res.status === 200) {
            message.success(res.statusText, 2);
          }
          fetchData();
        } catch (err) {
          message.error("删除用户失败!", 2);
        } finally {
          setDeleteBtnLoading(false);
        }
      },
    });
  }

  const columns: ColumnProps<UsersInfoList>[] = [
    {
      title: "用户名",
      dataIndex: "username",
      align: "center",
      key: "username",
    },
    {
      title: "性别",
      dataIndex: "sex",
      align: "center",
      key: "sex",
      render: (text: number) =>
        sexType.find((item) => item.code === text)?.value,
    },
    {
      title: "密码",
      dataIndex: "password",
      align: "center",
      key: "password",
    },
    {
      title: "电话",
      dataIndex: "phone",
      align: "center",
      key: "phone",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      align: "center",
      key: "email",
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      align: "center",
      key: "create_time",
      render: (text: string) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "操作",
      dataIndex: "operator",
      align: "center",
      key: "operator",
      render: (text: string, record: UsersInfoList) => {
        return (
          <>
            <Button type="primary" style={{ marginRight: 8 }}>
              编辑
            </Button>
            <Button danger onClick={() => showDeleteConfirm(record.user_id)}>
              删除
            </Button>
          </>
        );
      },
    },
  ];

  const handleChange = (page: TablePaginationConfig) => {
    fetchData({ pageNum: page.current, pageSize: page.pageSize });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const onSearch = (value: string) => {
    fetchData({ username: value });
  };
  return (
    <>
      <Card>
        <div className={styles.operator}>
          <Form>
            <Form.Item label="用户名">
              <Input.Search
                placeholder="请输入用户名进行搜索"
                onSearch={onSearch}
                style={{ width: 304 }}
                allowClear
                enterButton
              />
            </Form.Item>
          </Form>
          <Button
            className={styles.addUserBtn}
            type="primary"
            icon={<UserAddOutlined />}
            shape="round"
            onClick={() => setVisible(true)}
          >
            新增用户
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={tableList.list}
          rowKey="user_id"
          loading={tableLoading}
          onChange={handleChange}
          pagination={{
            current: tableList.pageNum,
            pageSize: tableList.pageSize,
            total: tableList.total,
            showTotal: (total) => `共${total}个结果`,
            showSizeChanger: true,
            showQuickJumper: true,
            defaultPageSize: 10,
            pageSizeOptions: ["10", "20", "30", "40"],
          }}
        />
      </Card>
      <AddUser
        visible={visible}
        closeModal={() => setVisible(false)}
        fetchData={fetchData}
      />
    </>
  );
};

export default Users;
