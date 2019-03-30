

import React from 'react';

import 'antd/dist/antd.css';
import './index.css';
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider,Footer } = Layout;


class App extends React.Component {


  render() {
    return (
      <div className="App">
          <Layout>
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1"><Icon type="robot" />好物后台管理系统</Menu.Item>
             
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>商品</Breadcrumb.Item>
              <Breadcrumb.Item>用户</Breadcrumb.Item>
              <Breadcrumb.Item>订单</Breadcrumb.Item>
            </Breadcrumb>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%' }}
                >
                  <SubMenu key="sub1" title={<span><Icon type="appstore" />商品管理</span>}>
                    <Menu.Item key="1">商品列表</Menu.Item>
                    <Menu.Item key="2">商品分类</Menu.Item>
                    <Menu.Item key="3">添加商品</Menu.Item>
                  
                  </SubMenu>
                  <SubMenu key="sub2" title={<span><Icon type="user" />用户管理</span>}>
                    <Menu.Item key="5">用户列表</Menu.Item>
                    <Menu.Item key="6">添加用户</Menu.Item>
                   
                  </SubMenu>
                  <SubMenu key="sub3" title={<span><Icon type="solution" />订单管理</span>}>
                    <Menu.Item key="9">订单管理</Menu.Item>
                  
                  </SubMenu>
                </Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                Content
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            好物 ©2019 Created by BJM,LLM
          </Footer>
        </Layout>
  </div>

   
    );
  }
}
          



/**/export default App;