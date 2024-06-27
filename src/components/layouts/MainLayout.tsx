"use client"
import React from 'react'
import { Layout } from 'antd'
import FooterComponent from '../ui/FooterComponent'
import NavbarComponent from '../ui/NavbarComponent'

const { Content } = Layout

const MainLayout = ({ children }: any) => {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: "white" }}>
      <NavbarComponent />
      <Layout>
        <Content
          style={{
            padding: 0,
            margin: 0,
            minHeight: '100vh',
            backgroundColor: 'white',
          }}
        >
          {children}
        </Content>
      </Layout>
      <FooterComponent />
    </Layout>
  )
}

export default MainLayout
