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
import {
  ShopOutlined,
  UserOutlined,
  HomeOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
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
const Order = lazy(
  () => import(/*WebpackChunkName: Order */ "@/components/Order")
);
const AddGoodsInfo = lazy(
  () =>
    import(
      /*WebpackChunkName: AddGoodsInfo */ "@/components/Goods/AddGoodsInfo"
    )
);

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Home = () => {
  const navigate = useNavigate();
  const keys = useRef<string[]>([sessionStorage.getItem("activePath") || "/"]);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse = () => setCollapsed(!collapsed);
  const handleEit = () => {
    sessionStorage.removeItem("token");
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
        <div
          className={styles.logo}
          style={{ background: !collapsed ? "#eff2f5" : "black" }}
        >
          {!collapsed ? "电商平台管理系统" : ""}
        </div>
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
          <SubMenu key="goods" icon={<ShopOutlined />} title="商品管理">
          <Menu.Item key="goods">
              <Link to="goods">商品管理</Link>
            </Menu.Item>
            <Menu.Item key="goods/add">
              <Link to="goods/add">添加商品</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="order" icon={<UnorderedListOutlined />}>
            <Link to="order">订单管理</Link>
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
                <Route path="/goods" element={<Goods />} />
                <Route path="/goods/add" element={<AddGoodsInfo />} />
                <Route path="/user" element={<Users />} />
                <Route path="/order" element={<Order />} />
                <Route path="*" element={<Navigate to="welcome" />} />
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
