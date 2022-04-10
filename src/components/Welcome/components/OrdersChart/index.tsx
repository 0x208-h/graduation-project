import React, { useEffect, useRef } from "react";
import styles from "./index.module.scss";
import { Column } from "@antv/g2plot";
import { ChartData } from "../../index";

interface UsersChartProps {
  data?: ChartData[];
}

const DeptPerformanceChart = ({ data }: UsersChartProps) => {
  const column = useRef<Column>();
  const dualOptions = {
    data: [],
    xField: "create_time",
    yField: "total",
    label: {
      // 可手动配置 label 数据标签位置
      // position: "middle", // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
  };
  useEffect(() => {
    // @ts-ignore
    column.current = new Column("goodscharts", dualOptions);
    column.current!.render();
  }, []);

  useEffect(() => {
    column.current!.update(dualOptions);
    column.current!.changeData(data!);
    column.current!.render();
  }, [data]);

  return <div className={styles.charts} id="goodscharts" />;
};

export default React.memo(DeptPerformanceChart);
