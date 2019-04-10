import React, { Component } from 'react';
import { Carousel } from 'antd';
import './zuce.css'
import withAxios from '../../hoc/withAxios';
import { async } from 'regenerator-runtime';
class zuce extends Component {
    constructor() {
        super();
        this.state = {
            currentIndex: 0,
            activeClass: 0,
            list1: [],
            list2: [],
            list3: [],
            iten: [],
            itentop: [],
            list: [],
            datalist: [],
        }
    }
    sui() {
        var arr1 = "1234567890poiuytrewqasdfghjklmnbvcxzQWERTYUIOPLKJHGFDSAZXCVBNM";
        var num = '';
        for (var j = 0; j < 4; j++) {
            num += arr1[parseInt(Math.random() * arr1.length)];
        }
        document.querySelector('#btn').value = num;
        return num;
    }
    onChange() {
    }
    ph() {
        var val = document.querySelector('#phone').value;
        var reg = /^1[3-9]\d{9}$/;
        var str = reg.test(val);
        console.log(str);
        if (str) {
            console.log('zheng');
        } else {
            console.log('无效的手机号码');
        }
    }
   que=()=>{
        (  async que1 =>{
            var text3 = document.querySelector('#btn1').value.toLowerCase();
            var text4 = document.querySelector('#btn').value.toLowerCase();
            var val = document.querySelector('#phone').value;
            var val2 = document.querySelector('#btn2').value;
            var reg = /^1[3-9]\d{9}$/;
            var str = reg.test(val);
            var isok = false;
            if (text4 === text3 && str === true) {
                alert('注册成功');
                isok = true;
                let { history } = this.props;
                history.push({
                    pathname: '/login/' ,
                })
            }
            else if (text3 === '' || text4 === ' ') {
                alert('手机号码或验证码不能为空');
            }
            else if (text3 !== text4) {
                alert('验证码不正确');
            }
            if (isok) {
                let res = await this.props.axios.post('/zuce', {
                    phone: val,
                    pwd: val2
                });
            }
    
        })();
    }
    render() {
        return (
            <div className="register-content">
                <img src={require('../../img/have-text-logo.png')} className='logoImage ng-scope'>
                </img>
                <div className="login-content-login">
                    <div className="log-con-num">
                        <i className="log-con-user">
                            <img src={require("../../img/number.png")} alt="">
                            </img></i> <input type="text" placeholder="请输入手机号" className="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength" id='phone' onBlur={this.ph} /> </div>
                    <div className="log-con-pw"> <i className="log-con-user">
                        <img src={require("../../img/password.png")} alt=""></img></i>
                        <input type="password" placeholder="请输入密码" className="ng-pristine ng-untouched ng-valid ng-empty" id='btn2' />
                    </div>
                    <div className="log-con-pw"> <i className="log-con-user">
                        <img src={require("../../img/password.png")} alt=""></img></i>
                        <input type="text" placeholder="请输入验证码" className="ng-pristine ng-untouched ng-valid ng-empty" id='btn1' />
                        <input type="button" className="reBtn btn btn-default" value="点击获取验证码" id="btn" style={{fontSize:'.593333rem'}} onClick={this.sui} onChange={this.onChange} /> </div>
                    <div className="reLabel">注册代表您同意 <a style={{ textDecoration: 'underline', color: 'black' }} >用户协议</a></div> <button className="loginbtn" onClick={this.que.bind(this)}>下一步</button> </div> </div >
        )
    }
}
zuce=withAxios(zuce);
export default zuce;