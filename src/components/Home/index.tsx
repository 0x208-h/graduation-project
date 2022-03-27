import React, { useRef, useState, Suspense, lazy } from "react";
import {
  Link,
  Outlet,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { Layout, Menu, message, Button, Popconfirm } from "antd";
import { ShopOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
const Users = lazy(
  () => import(/*WebpackChunkName: Users */ "@/components/Users")
);
const Goods = lazy(
  () => import(/*WebpackChunkName: Goods */ "@/components/Goods")
);
const Welcome = lazy(
  () => import(/*WebpackChunkName: Welcome */ "@/components/Welcome")
);

const { Header, Content, Footer, Sider } = Layout;

const Home = () => {
  const navigate = useNavigate();
  const keys = useRef<string[]>([sessionStorage.getItem("activePath") || "/"]);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse = () => setCollapsed(!collapsed);
  const handleEit = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("activePath");
    message.success("退出登录成功", 2);
    navigate("/login");
  };
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
        <Header className={styles.siteLayoutBackground}>
          <div>{`欢迎${sessionStorage.getItem("username")}`}</div>
          <Popconfirm
            title="确定退出嘛？"
            okText="确定"
            cancelText="取消"
            onConfirm={handleEit}
          >
            <Button type="link">退出</Button>
          </Popconfirm>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Suspense fallback={null}>
              <Routes>
                <Route path="/welcome" element={<Welcome />} />
                <Route path="good" element={<Goods />} />
                <Route path="user" element={<Users />} />
                <Route path="" element={<Navigate to="welcome" />} />
              </Routes>
            </Suspense>
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
