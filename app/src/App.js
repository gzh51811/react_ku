import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home/Home';
import List from './pages/List/List';
import Goods from './pages/Goods/Goods';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import Zuce from './pages/Login/zuce';
import User from './pages/Login/user'
import { Menu, Icon, Carousel,SubMenu} from 'antd';

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
      console.log( e.key==='Cart');
     
      if(e.key==='Cart'){
        let user = sessionStorage.getItem('user');
        if (!user) {
            alert('您还没有登录，请先登录亲');
          let {history}=this.props;
          history.push({
              pathname:'/login/'
          });
            user = {};
        }else{
          this.props.history.push('/' + e.key);
        }
        }else{
          this.props.history.push('/' + e.key);
        }

    });
  }
  render() {
    return (
      <div className='container'>
        <Menu
          onClick={this.handleClick}
          className='item-user'
          mode="horizontal"
        >
          {
            this.state.navs.map(item => <Menu.Item key={item.name}  style={{ border:'none'}}></Menu.Item>)
          }

        </Menu>

        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/zuce" component={Zuce} />
          <Route path="/user" component={User} />
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