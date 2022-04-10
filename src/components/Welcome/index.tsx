import React, { useState, useEffect } from "react";
import { Spin, message } from "antd";
import moment from "moment";
import UsersChart from "./components/UsersChart";
import Card from "./components/Card";
import OrdersChart from "./components/OrdersChart";
import { queryApi } from "@/utils/axios";
import styles from "./index.module.scss";

export interface ChartData {
  create_time: string;
  total: number;
}
export interface UsersChartResponse {
  status: number;
  list: ChartData[];
}

const Welcome = () => {
  const [userList, setUserList] = useState<ChartData[]>([]);
  const [usersLoading, setUsersLoading] = useState<boolean>(false);
  const [ordersLoading, setOrdersLoading] = useState<boolean>(false);
  const [orderList, setOrderList] = useState<ChartData[]>([]);
  const fetchData = async () => {
    try {
      setUsersLoading(true);
      setOrdersLoading(true);
      const userRes = await queryApi<UsersChartResponse>("/home/user");
      if (userRes.status === 200) {
        setUserList(
          userRes.list.map((item) => {
            return {
              ...item,
              create_time: moment(item.create_time).format("YYYY-MM-DD"),
            };
          })
        );
      }
      const orderRes = await queryApi<UsersChartResponse>("/home/order");
      if (orderRes.status === 200) {
        setOrderList(
          orderRes.list.map((item) => {
            return {
              ...item,
              create_time: moment(item.create_time).format("YYYY-MM-DD"),
            };
          })
        );
      }
    } catch (err) {
      message.error("获取图表数据失败", 2);
    } finally {
      setUsersLoading(false);
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      <Card
        bodyHeight={450}
        title="用户数"
        body={
          usersLoading ? (
            <div className={styles.spin}>
              <Spin />
            </div>
          ) : (
            <UsersChart data={userList} />
          )
        }
      />
      <Card
          bodyHeight={450}
          title="订单数"
          body={
            ordersLoading ? (
              <div className={styles.spin}>
                <Spin />
              </div>
            ) : (
              <OrdersChart data={orderList} />
            )
          }
        />
    </div>
  );
};

export default Welcome;
