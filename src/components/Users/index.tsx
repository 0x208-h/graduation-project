import React from "react";
import { Card, Input, Form, Table } from "antd";

import styles from "./index.module.scss";

const Users = () => {
  const onSearch = (value: string) => {
    console.log(value);
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
              enterButton
            />
          </Form.Item>
        </Form>
        <Table></Table>
      </Card>
    </>
  );
};

export default Users;
