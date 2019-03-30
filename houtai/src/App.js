import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Icon } from 'antd';

import GoodList from "./pages/GoodList";
import AddGood from "./pages/AddGood";
import EditGood from "./pages/EditGood";  //编辑商品
import UserList from "./pages/UserList";
import AddUser from "./pages/AddUser";
import OrderList from "./pages/OrderList";  //订单列表
import Classify from "./pages/Classify";

import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

const { Header, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      navs1: [
        {
          text: '商品列表',
          name: 'GoodList',
          path: '/goodslist',
        },
        {
          text: '添加商品',
          name: 'AddGood',
          path: '/addgood',
        }
        ,
        {
          text: '商品分类',
          name: 'Classify',
          path: '/classify',
        }
      ],
      navs2: [
        {
          text: '用户列表',
          name: 'UserList',
          path: '/userlist',
        }
        ,
        {
          text: '添加用户',
          name: 'AddUser',
          path: '/adduser',
        }
      ],
      navs3: [
        {
          text: '订单',
          name: 'OrderList',
          path: '/orderlist',
        }
      ],
      current: 'GoodList'
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  handleClick = (e) => {
    this.setState({
      current: e.key
    }, () => {
      this.props.history.push('/' + e.key.toLowerCase())
    })
  }
  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />

          <Menu
            // defaultSelectedKeys={['GoodList']}
            // defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.collapsed}
          >
            <SubMenu key="sub1" title={<span> <Icon type="pie-chart" /><span>商品</span></span>}>
              {
                this.state.navs1.map(item => <Menu.Item key={item.name} onClick={this.handleClick}>{item.text}</Menu.Item>
                )
              }
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="user" /><span>用户</span></span>}>
              {
                this.state.navs2.map(item => <Menu.Item key={item.name} onClick={this.handleClick}>{item.text}</Menu.Item>
                )
              }
            </SubMenu>
            <Menu.Item key={this.state.navs3[0].name} onClick={this.handleClick}>
              <Icon type="shopping-cart" />
              <span>{this.state.navs3[0].text}</span>
            </Menu.Item>
          </Menu>

        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Switch>
            <Route path="/goodslist" component={GoodList} exact />
            <Route path="/addgood" component={AddGood} />
            <Route path="/classify" component={Classify} />
            <Route path="/userlist" component={UserList} />
            <Route path="/adduser" component={AddUser} />
            <Route path="/editgood" component={EditGood} />
            <Route path="/orderlist" component={OrderList} />
            <Redirect from="/" to="/goodslist" />{/*重定向 */}
          </Switch>
        </Layout>
      </Layout>

    );
  }
}
App = withRouter(App)
export default App;
