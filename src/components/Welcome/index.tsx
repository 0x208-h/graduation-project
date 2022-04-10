import React, { useState, useEffect } from "react";
import { Spin, message } from "antd";
import moment from "moment";
import UsersChart from "./components/UsersChart";
import Card from "./components/Card";
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
  const [orderList, setOrderList] = useState<ChartData[]>([])
  const fetchData = async () => {
    try {
      setUsersLoading(true);
      const res = await queryApi<UsersChartResponse>("/home/user");
      if (res.status === 200) {
        setUserList(
          res.list.map((item) => {
            return {
              ...item,
              create_time: moment(item.create_time).format("YYYY-MM-DD"),
            };
          })
        );
      }
    } catch (err) {
      message.error("获取用户数据失败", 2);
    } finally {
      setUsersLoading(false);
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
            <UsersChart data={userList} />
          )
        }
      />
    </div>
  );
};

export default Welcome;
