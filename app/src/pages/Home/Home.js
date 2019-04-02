import React, { Component } from 'react';
import { render } from 'react-dom';
import { Carousel, Icon } from 'antd';
import './home.css';
class Home extends Component {
  render() {
    return (
      <div className='Home_contarin'>
        <ul className='Home_top'>
          <li className='active-tab'>推荐</li>
          <li>家饰</li>
          <li>收纳</li>
          <li>餐厨</li>
          <li>家纺</li>
          <li>家具</li>
        </ul>
        <Carousel autoplay>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
        </Carousel>
        <div className='Home_gon'>
          <p><Icon type="notification" style={{ fontSize: '16px', color: '#FFD914' }} />  好物公告  退换货说明</p>
        </div>
        <div className='Home_xin'>
          <div class="recommend-new-title">周一周四 - 新品首发</div>
        
        </div>
        
        <div class="recommend-new-bottom"> <a ng-href="/#/spec_activity/activity_items_category?type=allNews" href="/#/spec_activity/activity_items_category?type=allNews">查看所有新品 &gt;</a> </div>
        </div>
        )
     }
    }
    
    export default Home;
    /* For demo */
