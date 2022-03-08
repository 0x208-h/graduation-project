import React, { useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  ShopOutlined,
  UserOutlined,
  HomeOutlined
} from "@ant-design/icons";
import styles from "./index.module.scss";

const { Header, Content, Footer, Sider } = Layout;

const Home = () => {
  const location = useLocation();
  const keys = useRef<string[]>([sessionStorage.getItem("activePath") || "/"]);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse = () => setCollapsed(!collapsed);
  console.log(location, sessionStorage.getItem("activePath"));

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        className={styles.container}
      >
        <div className={styles.logo} />
        <Menu
          theme="dark"
          defaultSelectedKeys={keys.current}
          mode="inline"
          onSelect={({ keyPath }) =>
            sessionStorage.setItem("activePath", keyPath[0])
          }
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="">首页</Link>
          </Menu.Item>
          <Menu.Item key="user" icon={<UserOutlined />}>
            <Link to="user">用户管理</Link>
          </Menu.Item>
          <Menu.Item key="good" icon={<ShopOutlined />}>
            <Link to="good">商品管理</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={styles.siteLayout}>
        <Header className={styles.siteLayoutBackground} />
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          E-commerce Background Management System ©2022 Created by HCH
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
