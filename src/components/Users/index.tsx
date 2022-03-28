import React, { useState, useEffect } from "react";
import { Card, Input, Form, Table, message } from "antd";
import { ColumnProps, TablePaginationConfig } from "antd/lib/table";
import moment from "moment";
import { queryApi } from "@/utils/axios";

import styles from "./index.module.scss";

const initialValue = {
  pageNum: 1,
  pageSize: 10,
};

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
  sex: string;
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

const columns: ColumnProps<UsersInfoList>[] = [
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "性别",
    dataIndex: "sex",
    key: "sex",
  },
  {
    title: "密码",
    dataIndex: "password",
    key: "password",
  },
  {
    title: "电话",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
    key: "create_time",
    render: (text: string) => moment(text).format("YYYY-MM-DD"),
  },
  {
    title: "操作",
    dataIndex: "operator",
    key: "operator",
  },
];

const Users = () => {
  const [tableLoading, setTableLoading] = useState<boolean>(false);
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
        console.log(res.pageInfo);
      }
    } catch(err) {
      message.error("用户接口错误");
    } finally {
      setTableLoading(false);
    }
  };

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
      <Card className={styles.searchContainer}>
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
    </>
  );
};

export default Users;
