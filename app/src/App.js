import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home/Home';
import List from './pages/List/List';
import Goods from './pages/Goods/Goods';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import { Menu, Icon, Carousel} from 'antd';
import 'antd/dist/antd.css'; 
import { Route, Redirect, Switch, NavLink, withRouter } from 'react-router-dom';
class App extends Component {
  constructor() {
    super();
    this.state = {
      navs: [
        {
          text: '首页',
          name: 'Home',
          path: '/home',

        },
        {
          text: '列表',
          name: 'List',
          path: '/list',

        },

        {
          text: '购物车',
          name: 'Cart',
          path: '/cart',

        }, {
          text: '登录',
          name: 'Login',
          path: '/login',

        }
      ]
    }
  }
  handleClick = (e) => {
  
    this.setState({
      current: e.key,
    }, () => {
      this.props.history.push('/' + e.key);

    });
  }
  render() {
    return (
      <div className='container'>

        <Menu
          onClick={this.handleClick}
          className='item-user'
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          {
            this.state.navs.map(item => <Menu.Item key={item.name}></Menu.Item>)
          }

        </Menu>

        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/list" component={List} />
          <Route path="/login" component={Login} />
          <Route path="/goods/:id" component={Goods} />
          <Route path="/cart" component={Cart} />
          {/* <Route path="/" render={()=><div>我的首页</div>} exact/> */}
          <Redirect from="/" to="/home" />{/* 404 */}
        </Switch>
      </div>
    )
  }

}
App = withRouter(App);
// 高阶组件就是一个函数
export default App;