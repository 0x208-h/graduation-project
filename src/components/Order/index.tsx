import React, { useState, useEffect } from "react";
import { Card, Input, Form, Table, message, Button, Modal } from "antd";
import {
  UnorderedListOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { ColumnProps, TablePaginationConfig } from "antd/lib/table";
import moment from "moment";
import { queryApi, deleteApi, putApi } from "@/utils/axios";
import { DeleteResponse, UpdateResponse } from "@/utils/constant";
import styles from "./index.module.scss";

const { confirm } = Modal;

const initialValue = {
  pageNum: 1,
  pageSize: 10,
};

interface GetAllOrdersInfo {
  order_number?: string;
  pageNum?: number;
  pageSize?: number;
}

interface OrdersInfoList {
  order_id: string;
  order_number: string;
  order_sum: number;
  receiver: string;
  address: string;
  create_time: string;
}

interface OrdersInfoData {
  total: number;
  pageNum: number;
  pageSize: number;
  list: OrdersInfoList[];
}

interface OrdersInfoResponse {
  status: number;
  pageInfo: OrdersInfoData;
}

const Order = () => {
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [deleteBtnLoading, setDeleteBtnLoading] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [tableList, setTableList] = useState<OrdersInfoData>({
    total: 0,
    pageNum: 1,
    pageSize: 10,
    list: [],
  });

  const fetchData = async (data?: GetAllOrdersInfo) => {
    const params = {
      ...initialValue,
      ...data,
    };
    try {
      setTableLoading(true);
      const res = await queryApi<OrdersInfoResponse>(`/orders/all`, params);
      if (res.status === 200) {
        setTableList(res.pageInfo);
      }
    } catch (err) {
      message.error("获取订单接口错误", 2);
    } finally {
      setTableLoading(false);
    }
  };

  const onSearch = (value: string) => {
    fetchData({ order_number: value });
  };

  const handleChange = (page: TablePaginationConfig) => {
    fetchData({ pageNum: page.current, pageSize: page.pageSize });
  };

  // const getGoodsDetail = async (id: string) => {
  //   try {
  //     const res = await queryApi<GetGoodsInfoDetailResponse>(`goods/${id}`);
  //     if (res.status === 200) {
  //       setDetail(res.detail);
  //     }
  //   } catch (err) {
  //     message.error("获取当前商品信息失败", 2);
  //   }
  // };

  // const gotoBy = (offset: number) => () => {
  //   const newIndex = index + offset;
  //   if (newIndex >= 0 && newIndex < tableList?.total) {
  //     getGoodsDetail(tableList?.list[newIndex].goods_id);
  //     setIndex(newIndex);
  //   }
  // };

  const showDeleteConfirm = (id: string) => {
    confirm({
      title: "你确定要删除该订单吗？",
      icon: <ExclamationCircleOutlined />,
      okText: "确定",
      okButtonProps: { disabled: deleteBtnLoading },
      okType: "danger",
      cancelText: "取消",
      async onOk() {
        try {
          setDeleteBtnLoading(true);
          const res = await deleteApi<DeleteResponse>(`orders/${id}`);
          if (res.status === 200) {
            message.success(res.statusText, 2);
          }
          fetchData();
        } catch (err) {
          message.error("删除订单信息失败!", 2);
        } finally {
          setDeleteBtnLoading(false);
        }
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns: ColumnProps<OrdersInfoList>[] = [
    {
      title: "订单号",
      dataIndex: "order_number",
      align: "center",
      key: "order_number",
    },
    {
      title: "收件人",
      dataIndex: "receiver",
      align: "center",
      key: "receiver",
    },
    {
      title: "总金额",
      dataIndex: "order_sum",
      align: "center",
      key: "order_sum",
      render: (text: number) => `${text}元`,
    },
    {
      title: "地址",
      dataIndex: "address",
      align: "center",
      key: "address",
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      align: "center",
      key: "create_time",
      render: (text: string) => moment(text).format("YYYY-MM-DD"),
    }
  ];

  return (
    <>
      <Card>
        <div className={styles.operator}>
          <Form>
            <Form.Item label="订单号">
              <Input.Search
                placeholder="请输入订单号进行搜索"
                onSearch={onSearch}
                style={{ width: 304 }}
                allowClear
                enterButton
              />
            </Form.Item>
          </Form>
          {/* <Button
            className={styles.addOrderBtn}
            type="primary"
            icon={<UnorderedListOutlined />}
            shape="round"
            onClick={() => {
              navigate("/home/goods/add");
              sessionStorage.setItem("activePath", "goods/add");
            }}
          >
            新增
          </Button> */}
        </div>
        <Table
          columns={columns}
          dataSource={tableList.list}
          rowKey="order_id"
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
      {/* <GoodsDetail
        index={index}
        length={tableList.total}
        visible={drawerVisible}
        detail={detail}
        closeDrawer={() => setDrawerVisible(false)}
        onPrevious={gotoBy(-1)}
        onNext={gotoBy(1)}
      /> */}
    </>
  );
};

export default Order;
