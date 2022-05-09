import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Select, message, InputNumber } from "antd";
import moment from "moment";
import { IsPutAwayStatus } from "../index";
import { queryApi, postApi, putApi } from "@/utils/axios";
import { AddResponse, UpdateResponse } from "@/utils/constant";
import { GoodsInfoList, GetGoodsInfoDetailResponse } from "../index";

const { Option } = Select;

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

// interface GoodsClassifyState {
//   code: string;
//   value: string;
// }

// interface GoodsClassifyResponse {
//   status: number;
//   list: GoodsClassifyState[];
// }

interface SubmitDataProps {
  goods_name: string;
  goods_desc: string;
  goods_first_classify: string;
  inventory: number;
  price: number;
  is_putaway: number;
  goods_detail: string;
}

const classifyState = [
  { code: "1", value: "家具" },
  { code: "2", value: "电器" },
  { code: "3", value: "水果" },
  { code: "4", value: "蔬菜" },
  { code: "5", value: "玩具" },
];

const AddGoodsInfo = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const params = useParams();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  // const [detail, setDetail] = useState<GoodsInfoList>({} as GoodsInfoList);
  // const [classify, setClassify] = useState<GoodsClassifyState[]>([]);

  // const fetchClassify = async () => {
  //   try {
  //     const res = await queryApi<GoodsClassifyResponse>("goods/level");
  //     if (res.status === 200) {
  //       setClassify(res.list);
  //     }
  //   } catch (err) {
  //     message.error("获取商品一级分类失败", 2);
  //   }
  // };

  const fetchData = async (id?: string) => {
    try {
      const res = await queryApi<GetGoodsInfoDetailResponse>(`goods/${id}`);
      if (res.status === 200) {
        form.setFieldsValue(res.detail);
      }
    } catch (err) {
      message.error("获取当前商品信息失败", 2);
    }
  };

  useEffect(() => {
    if (params.id) fetchData(params?.id);
    return () => {
      form.resetFields();
    };
  }, [params?.id]);

  const handleSubmit = async (values: SubmitDataProps) => {
    try {
      setSubmitLoading(true);
      const data = {
        ...values,
        create_time: moment().format("YYYY-MM-DD"),
      };
      const res = await (params?.id ? putApi : postApi)<
        AddResponse | UpdateResponse
      >(params?.id ? `/goods/update/${params?.id}` : "/goods/add", data);
      if (res.status === 200) {
        message.success(res.statusText, 2);
        navigate("/home/goods/list");
      } else {
        message.error(res.statusText, 2)
      }
    } catch (err) {
      params?.id
        ? message.error("更新商品失败!", 2)
        : message.error("添加商品失败!", 2);
    } finally {
      setSubmitLoading(false);
    }
  };
  return (
    <Form
      {...formItemLayout}
      form={form}
      style={{ width: 600, margin: "0 auto" }}
    >
      <Form.Item
        label="商品名称"
        name="goods_name"
        hasFeedback
        rules={[{ required: true, message: "请输入商品名称!" }]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item
        label="商品描述"
        name="goods_desc"
        hasFeedback
        rules={[{ required: true, message: "请输入商品描述!" }]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item
        label="商品分类"
        name="goods_first_classify"
        hasFeedback
        rules={[{ required: true, message: "请选择商品分类!" }]}
      >
        <Select allowClear>
          {classifyState?.map((item) => {
            return (
              <Option key={item.value} value={item.code}>
                {item.value}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        label="商品价格"
        name="price"
        hasFeedback
        rules={[{ required: true, message: "请输入商品价格!" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="商品库存"
        name="inventory"
        hasFeedback
        rules={[{ required: true, message: "请输入商品库存!" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="商品状态"
        name="is_putaway"
        hasFeedback
        rules={[{ required: true, message: "请选择商品状态!" }]}
      >
        <Select>
          {IsPutAwayStatus.map((item) => {
            return (
              <Option key={item.code} value={item.code}>
                {item.renderValue}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item label="商品详情" name="goods_detail">
        <Input.TextArea allowClear style={{ height: 150 }} />
      </Form.Item>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button style={{ marginRight: 60 }} onClick={() => form.resetFields()}>
          清除
        </Button>
        <Button
          type="primary"
          loading={submitLoading}
          onClick={() =>
            form
              .validateFields()
              .then((values: SubmitDataProps) => {
                handleSubmit(values);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              })
          }
        >
          提交
        </Button>
      </div>
    </Form>
  );
};

export default AddGoodsInfo;
