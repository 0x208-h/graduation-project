import React, { useState, useEffect } from "react";
import { Card, Input, Form, Table, message, Button, Modal } from "antd";
import { ShoppingOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { ColumnProps, TablePaginationConfig } from "antd/lib/table";
import moment from "moment";
import { queryApi, deleteApi, putApi } from "@/utils/axios";
import { DeleteResponse, UpdateResponse } from "@/utils/constant";
import styles from "./index.module.scss";
import GoodsDetail from "./GoodsDetail";

const { confirm } = Modal;

const initialValue = {
  pageNum: 1,
  pageSize: 10,
};

enum ISPUTAWAY {
  SOLD_OUT,
  PUTAWAY,
}

export const IsPutAwayStatus = [
  { code: ISPUTAWAY.SOLD_OUT, value: "已下架", btnValue: "设置上架" },
  { code: ISPUTAWAY.PUTAWAY, value: "再售", btnValue: "设置下架" },
];

interface GetAllGoodsInfo {
  goodsName?: string;
  pageNum?: number;
  pageSize?: number;
}

export interface GoodsInfoList {
  goods_id: string;
  goods_name: string;
  goods_desc: string;
  goods_first_classify: string;
  price: number;
  inventory: number;
  is_putaway: number;
  goods_detail: string;
  create_time: string;
}

interface GetGoodsInfoDetailResponse {
  status: number;
  detail: GoodsInfoList;
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
  const [deleteBtnLoading, setDeleteBtnLoading] = useState<boolean>(false);
  const [updateStatusLoading, setUpdateStatusLoading] =
    useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [detail, setDetail] = useState<GoodsInfoList>({} as GoodsInfoList);
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

  const handleEdit = (id: string) => {};

  const getGoodsDetail = async (id: string) => {
    try {
      const res = await queryApi<GetGoodsInfoDetailResponse>(`goods/${id}`);
      if (res.status === 200) {
        setDetail(res.detail);
      }
    } catch (err) {
      message.error("获取当前商品信息失败", 2);
    }
  };

  const gotoBy = (offset: number) => () => {
    const newIndex = index + offset;
    if (newIndex >= 0 && newIndex < tableList?.total) {
      getGoodsDetail(tableList?.list[newIndex].goods_id);
      setIndex(newIndex);
    }
  };

  const showDeleteConfirm = (id: string) => {
    confirm({
      title: "你确定要删除该商品吗？",
      icon: <ExclamationCircleOutlined />,
      okText: "确定",
      okButtonProps: { disabled: deleteBtnLoading },
      okType: "danger",
      cancelText: "取消",
      async onOk() {
        try {
          setDeleteBtnLoading(true);
          const res = await deleteApi<DeleteResponse>(`goods/${id}`);
          if (res.status === 200) {
            message.success(res.statusText, 2);
          }
          fetchData();
        } catch (err) {
          message.error("删除商品信息失败!", 2);
        } finally {
          setDeleteBtnLoading(false);
        }
      },
    });
  };

  const handleGoodsStatus = async (id: string, status: number) => {
    const data = {
      id,
      status,
      create_time: moment().format("YYYY-MM-DD"),
    };
    try {
      setUpdateStatusLoading(true);
      const res = await putApi<UpdateResponse>(`/goods/updateStatus`, data);
      if (res.status === 200) {
        message.success(res.statusText, 2);
        fetchData();
      }
    } catch (err) {
      message.error("修改商品状态失败", 2);
    } finally {
      setUpdateStatusLoading(false);
    }
  };

  const handleDetail = (id: string) => {
    setDrawerVisible(true);
    getGoodsDetail(id);
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
      render: (text: string, record: GoodsInfoList) => (
        <Button type="link" onClick={() => handleDetail(record.goods_id)}>
          {text}
        </Button>
      ),
    },
    {
      title: "商品描述",
      dataIndex: "goods_desc",
      align: "center",
      key: "goods_desc",
    },
    {
      title: "商品一级分类",
      dataIndex: "goods_first_classify",
      align: "center",
      key: "goods_first_classify",
    },
    {
      title: "商品价格",
      dataIndex: "price",
      align: "center",
      key: "price",
    },
    {
      title: "库存",
      dataIndex: "inventory",
      align: "center",
      key: "inventory",
    },
    {
      title: "商品状态",
      dataIndex: "is_putaway",
      align: "center",
      key: "is_putaway",
      render: (text: string, record: GoodsInfoList) => {
        return (
          <>
            <span>
              {
                IsPutAwayStatus.find((item) => item.code === Number(text))
                  ?.value
              }
            </span>
            <Button
              type="link"
              loading={updateStatusLoading}
              onClick={() =>
                handleGoodsStatus(record.goods_id, record.is_putaway)
              }
            >
              {
                IsPutAwayStatus.find((item) => item.code === Number(text))
                  ?.btnValue
              }
            </Button>
          </>
        );
      },
    },
    {
      title: "商品最新更新时间",
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
      render: (text: string, record: GoodsInfoList) => {
        return (
          <>
            <Button
              type="primary"
              style={{ marginRight: 8 }}
              onClick={() => handleEdit(record.goods_id)}
            >
              编辑
            </Button>
            <Button danger onClick={() => showDeleteConfirm(record.goods_id)}>
              删除
            </Button>
          </>
        );
      },
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
            icon={<ShoppingOutlined />}
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
      <GoodsDetail
        index={index}
        length={tableList.total}
        visible={drawerVisible}
        detail={detail}
        closeDrawer={() => setDrawerVisible(false)}
        onPrevious={gotoBy(-1)}
        onNext={gotoBy(1)}
      />
    </>
  );
};

export default Goods;
