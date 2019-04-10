import React, { Component } from 'react';
import { Carousel } from 'antd';
import './user.css'
import withAxios from '../../hoc/withAxios';
import { async } from 'regenerator-runtime';
class user extends Component {
    constructor() {
        super();
        this.state = {
            currentIndex: 0,
            activeclassName: 0,
            list1: [],
            list2: [],
            list3: [],
            iten: [],
            itentop: [],
            list: [],
            datalist: [],
        }
    }
    componentDidMount() {
        let user = sessionStorage.getItem('user');
        if (!user) {
            user = {}
        } else {
            user = JSON.parse(user);
        }
        if (user._id) {
            document.querySelector('#user123').innerHTML = `${user.phone}`;
            document.querySelector('#yibang').innerHTML = `已绑定手机号码：${user.phone}`
        }
    }
    cler(){
          sessionStorage.clear();
          let {history}=this.props;
          history.push({
              pathname:'/login/'
          })
      
    }
    render() {
        return (
            <div className='personal'>
                <div className="pr">
                    <section className="personal-bg"><img src={require('../../img/personal-bg.png')} alt="" style={{ height: '12rem', width: '100%', marginTop: '-4rem' }} /> </section>
                    <div className="user-avatar">
                        <img src="https://avatar.file.myhaowu.com/default-3?imageMogr2/thumbnail/150x" /> </div>
                    <div className="user-name ng-binding" id='user123'></div>
                </div>
                <section className="vertical-box clearfix second-section" style={{ marginBottom: '5px' }}>
                    <div style={{ width: '100%' }}>
                        <span>我的订单</span>
                        <div className="fr">
                            <span className="select-all-order"> 查看全部订单 </span>
                        </div> </div>
                    <div className="order-state-list"> <span className="state1 badge-box pr" > 待付款 <i className="badge ng-binding ng-hide" ></i> </span> <span className="state2 badge-box pr" > <i className="badge ng-binding ng-hide" ng-show="waitPublish"></i> 待发货 </span> <span className="state3 badge-box pr" > <i className="badge ng-binding ng-hide" ></i> 已发货 </span> <span className="state4 badge-box pr" >  已完成 </span> </div> </section>
                <section className="vertical-box" > <span>我的优惠券</span> <div className="fr"> <span className="select-all-order ng-binding"> 0张优惠券 </span> </div> </section>
                <section className="vertical-box ng-binding ng-scope" id='yibang'>  </section>
                <section className="vertical-box ng-binding ng-scope" > 联系客服 </section>
                <section className="vertical-box ng-binding ng-scope" > 联系好物APP </section>
                <section className="vertical-box ng-binding ng-scope" > 下载好物APP </section>
                <section className="vertical-box ng-binding ng-scope" onClick={this.cler.bind(this)} >退出当前账号</section>
                <div className="vertical-box bottom"> <div className="bottom-title">享受更多贴心功能， 请下载好物App</div> <div style={{marginTop: '1.25rem'}}> 
                <div className="bottom-box"> 
                <img src={require("../../img/page-white.png")} alt="" /> <p>居家干货</p> </div> 
                <div className="bottom-box"> <img src={require('../../img/phone.png')} alt="" /> <p>社区晒单</p> </div> 
                <div className="bottom-box"> <img src={require('../../img/car.png')} alt="" /> <p>订单追踪</p> </div> </div> </div>
            </div>
        )
    }
}

export default user;