import React, { FC } from "react";
import { Button, Drawer, Space, Row, Col } from "antd";
import moment from "moment";
import { GoodsInfoList, IsPutAwayStatus } from "../index";

interface drawerVisible {
  index: number;
  length: number;
  visible: boolean;
  detail: GoodsInfoList;
  closeDrawer: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

const GoodsDetail: FC<drawerVisible> = ({
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
      title={`${detail?.goods_name}商品详情`}
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
      <Row style={{ marginBottom: 30 }}>
        <Col span={12}>
          <div>商品名称</div>
          <div>{detail?.goods_name || "--"}</div>
        </Col>
        <Col span={12}>
          <div>商品描述</div>
          <div>{detail?.goods_desc || "--"}</div>
        </Col>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <Col span={12}>
          <div>商品一级分类</div>
          <div>{detail?.goods_first_classify || "--"}</div>
        </Col>
        <Col span={12}>
          <div>商品价格</div>
          <div>{detail?.price || "--"}</div>
        </Col>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <Col span={12}>
          <div>商品库存</div>
          <div>{detail?.inventory || "--"}</div>
        </Col>
        <Col span={12}>
          <div>商品状态</div>
          <div>
            {IsPutAwayStatus.find((item) => item.code === detail?.is_putaway)
              ?.value || "--"}
          </div>
        </Col>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <Col span={12}>
          <div>商品最近更新时间</div>
          <div>{moment(detail?.create_time).format("YYYY-MM-DD") || "--"}</div>
        </Col>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <Col span={12}>
          <div>商品详细信息</div>
          <div>{detail?.goods_detail || "--"}</div>
        </Col>
      </Row>
    </Drawer>
  );
};

export default GoodsDetail;
