import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, Table, message } from "antd";
import { ContactsOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { ColumnProps, TablePaginationConfig } from "antd/lib/table";
import moment from "moment";
import { queryApi } from "@/utils/axios";
import styles from "./index.module.scss";

const initialValue = {
  pageNum: 1,
  pageSize: 10,
};

interface ProviderInfoList {
  provider_id: string;
  provider_name: string;
  create_time: string;
  update_time: string;
  account_status: string;
  provider_responsible_person: string;
  provider_role: string;
  credit_amount: number;
  contract_id: string;
}

interface ProvidersInfoData {
  total: number;
  pageNum: number;
  pageSize: number;
  list: ProviderInfoList[];
}

interface GetAllProvidersInfo {
  pageNum?: number;
  pageSize?: number;
  providerName?: string;
}

interface ProvidersInfoResponse {
  status: number;
  pageInfo: ProvidersInfoData;
}

const Provider = () => {
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [deleteBtnLoading, setDeleteBtnLoading] = useState<boolean>(false);
  const [type, setType] = useState<"new" | "edit">("new");
  const [tableList, setTableList] = useState<ProvidersInfoData>({
    total: 0,
    pageNum: 1,
    pageSize: 10,
    list: [],
  });

  const columns: ColumnProps<ProviderInfoList>[] = [
    {
      title: "编号",
      dataIndex: "id",
      align: "center",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "商户名称",
      dataIndex: "provider_name",
      key: "provider_name",
      align: "center",
    },
    {
      title: "账户状态",
      dataIndex: "account_status",
      key: "account_status",
      align: "center",
    },
    {
      title: "负责人",
      dataIndex: "provider_responsible_person",
      key: "provider_responsible_person",
      align: "center",
    },
    {
      title: "角色",
      dataIndex: "provider_role",
      key: "provider_role",
      align: "center",
    },
    {
      title: "信用额度",
      dataIndex: "credit_amount",
      key: "credit_amount",
      align: "center",
      render: (text: number) => `${new Intl.NumberFormat().format(text)}元`,
    },
    {
      title: "合同编号",
      dataIndex: "contract_id",
      key: "contract_id",
      align: "center",
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      key: "create_time",
      align: "center",
      render: (text, record) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "更新时间",
      dataIndex: "update_time",
      key: "update_time",
      align: "center",
      render: (text, record) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "操作",
      dataIndex: "operator",
      key: "operator",
      align: "center",
      // render: (text, record) =>
    },
  ];

  const fetchData = async (data?: GetAllProvidersInfo) => {
    const params = {
      ...initialValue,
      ...data,
    };
    try {
      setTableLoading(true);
      const res = await queryApi<ProvidersInfoResponse>(
        `/provider/list`,
        params
      );
      if (res.status === 200) {
        setTableList(res.pageInfo);
      }
    } catch (err) {
      message.error("商户接口错误", 2);
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
    fetchData({ providerName: value });
  };
  return (
    <>
      <Card>
        <div className={styles.operator}>
          <Form>
            <Form.Item label="商户名">
              <Input.Search
                placeholder="请输入商户名进行搜索"
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
            icon={<ContactsOutlined />}
            shape="round"
            onClick={() => {
              setVisible(true);
              setType("new");
            }}
          >
            新增商户
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
      {/* <AddUser
        visible={visible}
        type={type}
        detail={detail}
        closeModal={() => {
          setVisible(false);
        }}
        fetchData={fetchData}
        setType={() => setType("new")}
      /> */}
    </>
  );
};

export default Provider;
