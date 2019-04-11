import React from 'react';
import { Form, Tooltip, Icon, DatePicker, Button, Input, message } from 'antd';
// const { MonthPicker, RangePicker } = DatePicker;
import withAxios from "../hoc/withAxios";

class AddUser extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            const values = {  //表单内容
                ...fieldsValue,
                'date_picker': fieldsValue['date-picker'].format('YYYY-MM-DD')
            };

            this.props.axios.get('/adduser', {
                params: {
                    name: values.nickname,
                    email: values.email,
                    password: values.password,
                    time: values.date_picker,
                    key: values.password,
                    important: false
                }
            }).then(res => {
                if (res) {
                    message.success('用户添加成功');
                }
            })
        });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入不一致，请再次确认密码!');
        } else {
            callback();
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const config = {
            rules: [{ type: 'object', required: true, message: '请选择时间!' }],
        };
        return (<div className="conts" >
            <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ width: "800px" }}>
                <Form.Item
                    label={(
                        <span>
                            昵称&nbsp;
              <Tooltip title="你希望别人怎么称呼你?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '请输入你的昵称!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="邮箱"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '输入的邮件无效!',
                        }, {
                            required: true, message: '请确认您的电子邮件!',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="密码"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入您的密码!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </Form.Item>
                <Form.Item
                    label="确认密码"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请再次确认密码!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </Form.Item>
                <Form.Item
                    label="选择日期"
                >
                    {getFieldDecorator('date-picker', config)(
                        <DatePicker />
                    )}
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}
                >
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>

            </Form>
        </div>)
    }
}

AddUser = withAxios(Form.create({ name: 'time_related_controls' })(AddUser));

const WrappedTimeRelatedForm = Form.create()(AddUser);




export default WrappedTimeRelatedForm;