import React, { useState } from "react";
import { Link, Outlet } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styles from './index.module.scss'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Home = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse = () => setCollapsed(!collapsed);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className={styles.container}>
        <div className={styles.logo} />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to="user">用户管理</Link>
            
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="good">商品管理</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={styles.siteLayout}>
        <Header className={styles.siteLayoutBackground} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
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
