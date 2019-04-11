import React, { Component } from 'react';
import { Carousel } from 'antd';
import './login.css'
import withAxios from '../../hoc/withAxios';
import { async } from 'regenerator-runtime';
class login extends Component {
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
            phisok:false,
            pwdisok:false
        }
    }
    reaqu1() {
        (async btncl => {
            var text1 = document.querySelector('#user').value;
            var text2 = document.querySelector('#pwd').value;
            let res = await this.props.axios.post('/lgin', {
                phone: text1
            }).then(res => {
                console.log(res);
                if (res.data.are === 0) {
                    alert('该号码还未注册过，请先注册');
                }
            });
        })();
    }
    reaqu2() {
        (async btncl => {
            var text1 = document.querySelector('#user').value;
            var text2 = document.querySelector('#pwd').value;
            let res = await this.props.axios.post('/pwd', {
                phone:text1,
                pwd: text2
            }).then(res => {
                console.log(res);
                if (res.data.are === 0) {
                    alert('密码不正确，请重新输入');
                }
            });
        })();
    }
    reaqu() {
        (async btncl => {
            var text1 = document.querySelector('#user').value;
            var text2 = document.querySelector('#pwd').value;
            let res = await this.props.axios.post('/pwd', {
                phone:text1,
                pwd: text2
            }).then(res => {
                console.log(res);
                if (res.data.are === 0) {
                    alert('手机号码或者密码错误，请重新登录');
                }else{
                   console.log(res.data.arr[0]);
                    var str=JSON.stringify(res.data.arr[0])
                    console.log(str)
                    sessionStorage.setItem('user',str);
                    let { history } = this.props;
                    history.push({
                        pathname: '/user/' ,
                    })
                }
            });
        })();
    }
    goto() {
        console.log(this);
        let { history } = this.props;
        history.push({
            pathname: '/zuce/',
        })
    }
    render() {
        return (
            <div className='login'>
                <div className="login-content">
                    <img src={require("../../img/have.png")} alt="" className="logoImage1" />

                    <div className="login-content-login">
                        <div className="log-con-num"> <i className="log-con-user">
                            <img src={require("../../img/number.png")} alt="" />
                        </i>
                            <input type="text" placeholder="请输入手机号" className="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength" id='user' onBlur={this.reaqu1.bind(this)} />
                        </div>
                        <div className="log-con-pw">
                            <i className="log-con-user">
                                <img src={require("../../img/password.png")} alt="" />

                            </i>
                            <input type="password" placeholder="请输入密码" className="ng-pristine ng-untouched ng-valid ng-empty" id='pwd' />
                        </div>
                        <button className="loginbtn" onClick={this.reaqu.bind(this)} >登录</button> </div>
                </div>
                <div className="footer">
                    <div className="col-6" onClick={this.goto.bind(this)}> 手机号注册 </div> 
                    <div className="col-7" > <div> 忘记密码? </div> </div> </div>
            </div>

        )
    }
}
login = withAxios(login);
export default login;