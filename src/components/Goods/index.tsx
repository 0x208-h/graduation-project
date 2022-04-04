import React, { useState, useEffect } from "react";
import { Card, Input, Form, Table, message, Button, Modal } from "antd";
import { ColumnProps, TablePaginationConfig } from "antd/lib/table";
import moment from "moment";
import { queryApi, deleteApi } from "@/utils/axios";
import styles from "./index.module.scss";

const { confirm } = Modal;

const initialValue = {
  pageNum: 1,
  pageSize: 10,
};

enum ISPUTAWAY {
  SOLD_OUT,
  PUTAWAY,
}

const IsPutAwayStatus = [
  { code: ISPUTAWAY.SOLD_OUT, value: "已下架", btnValue: "设置上架" },
  { code: ISPUTAWAY.PUTAWAY, value: "再售", btnValue: "设置下架" },
];

interface GetAllGoodsInfo {
  goodsName?: string;
  pageNum?: number;
  pageSize?: number;
}

interface GoodsInfoList {
  goods_id: string;
  goods_name: string;
  goods_desc: string;
  goods_first_classify: string;
  price: number;
  inventory: number;
  is_put_away: boolean;
  goods_detail: string;
  create_time: string;
}

interface GoodsInfoData {
  total: number;
  pageNum: number;
  pageSize: number;
  list: GoodsInfoList[];
}

interface GoodsInfoResponse {
  status: number;
  pageInfo: GoodsInfoData;
}

const Goods = () => {
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [tableList, setTableList] = useState<GoodsInfoData>({
    total: 0,
    pageNum: 1,
    pageSize: 10,
    list: [],
  });

  const fetchData = async (data?: GetAllGoodsInfo) => {
    const params = {
      ...initialValue,
      ...data,
    };
    try {
      setTableLoading(true);
      const res = await queryApi<GoodsInfoResponse>(`/goods/all`, params);
      if (res.status === 200) {
        setTableList(res.pageInfo);
      }
    } catch (err) {
      message.error("获取商品接口错误", 2);
    } finally {
      setTableLoading(false);
    }
  };

  const onSearch = (value: string) => {
    fetchData({ goodsName: value });
  };

  const handleChange = (page: TablePaginationConfig) => {
    fetchData({ pageNum: page.current, pageSize: page.pageSize });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns: ColumnProps<GoodsInfoList>[] = [
    {
      title: "商品名称",
      dataIndex: "goods_name",
      align: "center",
      key: "goods_name",
    },
  ];
  return (
    <>
      <Card>
        <div className={styles.operator}>
          <Form>
            <Form.Item label="商品名称">
              <Input.Search
                placeholder="请输入商品名称进行搜索"
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
            // icon={<UserAddOutlined />}
            shape="round"
            // onClick={() => {
            //   setVisible(true);
            //   setType("new");
            // }}
          >
            新增商品
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={tableList.list}
          rowKey="goods_id"
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

export default Goods;
