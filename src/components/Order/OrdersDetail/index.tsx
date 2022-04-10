import React, { FC } from "react";
import { Button, Drawer, Space, Row, Col, Table } from "antd";
import moment from "moment";
import { OrderDeatilData, PAY_STATUS } from "../index";

interface OrdersDetailProps {
  index: number;
  length: number;
  visible: boolean;
  detail: OrderDeatilData;
  closeDrawer: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

enum PAY_WAY_TYPE {
  ONLINE,
  OFFLINE,
}

const PAY_WAY = [
  {
    code: PAY_WAY_TYPE.ONLINE,
    value: "线上支付",
  },
  {
    code: PAY_WAY_TYPE.OFFLINE,
    value: "线下支付",
  },
];

const OrdersDetail: FC<OrdersDetailProps> = ({
  index,
  length,
  visible,
  detail,
  closeDrawer,
  onPrevious,
  onNext,
}) => {
  return (
    <Drawer
      visible={visible}
      onClose={closeDrawer}
      destroyOnClose
      title="订单详情"
      width={600}
      extra={
        <Space>
          <Button disabled={index === 0} onClick={onPrevious}>
            上一个
          </Button>
          <Button disabled={index === length - 1} onClick={onNext}>
            下一个
          </Button>
        </Space>
      }
    >
      <h5>订单基本信息</h5>
      <Row style={{ marginBottom: 30 }}>
        <Col span={8}>
          <div>订单号</div>
          <div>{detail?.order_number || "--"}</div>
        </Col>
        <Col span={8}>
          <div>创建时间</div>
          <div>{moment(detail?.create_time).format("YYYY-MM-DD") || "--"}</div>
        </Col>
        <Col span={8}>
          <div>支付状态</div>
          <div>{PAY_STATUS[detail?.pay_status]?.value || "--"}</div>
        </Col>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <Col span={8}>
          <div>支付方式</div>
          <div>{PAY_WAY[detail?.pay_way]?.value || "--"}</div>
        </Col>
        <Col span={8}>
          <div>总金额</div>
          <div>{`${detail.order_sum}元` || "--"}</div>
        </Col>
      </Row>
      <h5>收件人基本信息</h5>
      <Row style={{ marginBottom: 30 }}>
        <Col span={8}>
          <div>收件人名字</div>
          <div>{detail?.receiver || "--"}</div>
        </Col>
        <Col span={8}>
          <div>收件人电话</div>
          <div>{detail?.phone || "--"}</div>
        </Col>
        <Col span={8}>
          <div>收件人地址</div>
          <div>{detail?.address || "--"}</div>
        </Col>
      </Row>
      <h5>商品基本信息</h5>
      <Table
        rowKey="order_detail_id"
        dataSource={detail?.detail?.length > 0 ? detail.detail : []}
      >
        <Table.Column
          title="商品名称"
          dataIndex="order_name"
          align="center"
          key="order_name"
        />
        <Table.Column
          title="商品数量"
          dataIndex="count"
          align="center"
          key="count"
        />
        <Table.Column
          title="商品单价"
          dataIndex="price"
          align="center"
          key="price"
        />
        <Table.Column
          title="商品总价"
          dataIndex="total"
          align="center"
          key="total"
        />
      </Table>
    </Drawer>
  );
};

export default OrdersDetail;
