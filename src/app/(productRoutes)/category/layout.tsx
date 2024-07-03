"use client"
import { Layout, Menu } from "antd"
import { FilterOutlined } from "@ant-design/icons"
import Sider from "antd/es/layout/Sider"
import React, { useState } from "react"

const { Content } = Layout

const CategoryPageLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "white" }}>
      <Sider
        onCollapse={() => setCollapsed(!collapsed)}
        trigger={<FilterOutlined />}
        width={300}
        breakpoint="md"
        collapsedWidth="0"
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", padding: "20px" }}
        >
          <h1 className="text-xl">Filter</h1>
        </Menu>
      </Sider>
      <Content
        style={{
          padding: 20,
          margin: 0,
          minHeight: "100vh",
          backgroundColor: "white",
        }}
      >
        {children}
      </Content>
    </Layout>
  )
}

export default CategoryPageLayout
