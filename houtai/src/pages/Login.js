import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import "./css/login.css";
import withAxios from "../hoc/withAxios";

class Login extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //接收到的信息
                // console.log('Received values of form: ', values);
                // console.log(this.props);
                this.props.axios.post('/login', {
                    params: {
                        name: values.userName,
                        password: values.password,
                        mdl: values.remember
                    }
                }).then(res => {
                    // console.log(res);
                    if (res.data.code !== 100) {
                        // var ken = res.data.token;
                        var username = JSON.stringify(res.data);
                        localStorage.setItem('user', username);
                        message.success('登陆成功！');

                        this.props.history.push('/index')
                    } else {
                        message.error('登陆失败，用户名或密码错误！');
                    }
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="main">
                <h1>好物后台管理系统</h1>
                <Form onClick={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入您的用户名!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入您的密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住密码</Checkbox>
                        )}
                        <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

Login = withAxios(Form.create({ name: 'normal_login' })(Login));

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);


export default WrappedNormalLoginForm;