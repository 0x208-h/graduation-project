import React, { useEffect, useRef } from "react";
import styles from "./index.module.scss";
import { Line } from "@antv/g2plot";
import { ChartData } from "../../index";

interface UsersChartProps {
  data?: ChartData[];
}

const DeptPerformanceChart = ({ data }: UsersChartProps) => {
  const line = useRef<Line>();
  const dualOptions = {
    data: [],
    xField: "create_time",
    yField: "total",
    xAxis: {
      tickCount: 5,
    },
    smooth: true,
  };
  useEffect(() => {
    // @ts-ignore
    line.current = new Line("userscharts", dualOptions);
    line.current!.render();
  }, []);

  useEffect(() => {
    line.current!.update(dualOptions);
    line.current!.changeData(data!);
    line.current!.render();
  }, [data]);

  return <div className={styles.charts} id="userscharts" />;
};

export default React.memo(DeptPerformanceChart);
