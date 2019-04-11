import React, { Component } from 'react';
import { Card, Form, Input, Icon, Cascader, Select, Row, Col, Button, Upload, Modal } from 'antd';
// import LoginForm from './LoginForm';
// import ModalForm from './ModalForm';
// import HorizontalForm from './HorizontalForm';
// import BreadcrumbCustom from '../BreadcrumbCustom';
import withAxios from '../hoc/withAxios';
// import axios from 'axios';


const FormItem = Form.Item;
const Option = Select.Option;

const residences = [{
    value: '家饰',
    label: '家饰',

}, {
    value: '收纳',
    label: '收纳',

},
{
    value: '厨具',
    label: '厨具',
},
{
    value: '家纺',
    label: '家纺',
},
{
    value: '家具',
    label: '家具',
}];

const residences2 = [{
    value: '热销',
    label: '热销',

}, {
    value: '促销',
    label: '促销',

},
{
    value: '推荐',
    label: '推荐',
}, {
    value: '下架',
    label: '下架',
}];


class BasicForms extends Component {

    constructor() {
        super();
        // this.state = {
        // }
        this.gotoGoods = this.gotoGoods.bind(this);
    }


    state = {
        confirmDirty: false,

        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],


    };


    //图片上传
    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange = ({ fileList }) => this.setState({ fileList });

    //............................................................................
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // let data = values;
                // console.log('Received values of form: ', values);
                // console.log(data)
                console.log(this);
                this.props.axios.get('/goods', {
                    params: {
                        name: values.name,
                        nickname2: values.nickname2,
                        nickname3: values.nickname3,
                        nickname4: values.nickname4,
                        nickname5: values.nickname5,
                        prefix: values.prefix,
                        residence: values.residence[0],
                        residence2: values.residence2[0]
                    }
                })
                // var test=JSON.stringify(params);    residence2:JSON.stringify(values.residence2)
                // console.log(data);
                alert("添加成功！")
            }

        });
        // this.setState({
        //     current: e.key
        // }, () => {
        //     //路由跳转：编程式导航
        //     // 利用withRouter()高阶组件实现history的传递
        this.props.history.push(this.props.match.url + e.key);
        // });

    };
    gotoGoods(id) {
        console.log(this)
        let { history } = this.props;
        history.push({
            pathname: '/GoodList/' + id,
            search: '?id=' + id,
            // state: {
            //     id
            // }
        })
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select className="icp-selector" style={{ width: '20px' }}>
                <Option value="热卖">热卖</Option>
                <Option value="推荐">推荐</Option>
                <Option value="促销">促销</Option>
                <Option value="下架">下架</Option>
            </Select>
        );

        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );

        return (
            <div className="gutter-example">
                {/* <BreadcrumbCustom first="表单" second="基础表单" /> */}
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="添加商品" bordered={false}>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormItem
                                        {...formItemLayout}
                                        label={(
                                            <span>
                                                商品名称
                                             {/*<Tooltip title="简单描述你的商品?">
                                                    <Icon type="question-circle-o" /> 
                                             </Tooltip>*/}
                                            </span>
                                        )}
                                        hasFeedback
                                    >
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请简单描述你的商品!', whitespace: true }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label={(
                                            <span>
                                                商品价格
                                             {/*<Tooltip title="简单描述你的商品?">
                                                    <Icon type="question-circle-o" /> 
                                             </Tooltip>*/}
                                            </span>
                                        )}
                                        hasFeedback
                                    >
                                        {getFieldDecorator('nickname2', {
                                            rules: [{ required: true, message: '请简单描述你的商品!', whitespace: true }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label={(
                                            <span>
                                                销售价格
                                             {/*<Tooltip title="简单描述你的商品?">
                                                    <Icon type="question-circle-o" /> 
                                             </Tooltip>*/}
                                            </span>
                                        )}
                                        hasFeedback
                                    >
                                        {getFieldDecorator('nickname3', {
                                            rules: [{ required: true, message: '请简单描述你的商品!', whitespace: true }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label={(
                                            <span>
                                                商品描述
                                             {/*<Tooltip title="简单描述你的商品?">
                                                    <Icon type="question-circle-o" /> 
                                             </Tooltip>*/}
                                            </span>
                                        )}
                                        hasFeedback
                                    >
                                        {getFieldDecorator('nickname4', {
                                            rules: [{ required: true, message: '请简单描述你的商品!', whitespace: true }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="商品分类"
                                    >
                                        {getFieldDecorator('residence', {
                                            initialValue: ['家饰', '收纳', '厨具', '家具', '家纺'],
                                            rules: [{ type: 'array', required: true, message: '请选择商品的分类!' }],
                                        })(
                                            <Cascader options={residences} />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label={(
                                            <span>
                                                商品库存
                                             {/*<Tooltip title="简单描述你的商品?">
                                                    <Icon type="question-circle-o" /> 
                                             </Tooltip>*/}
                                            </span>
                                        )}
                                        hasFeedback
                                    >
                                        {getFieldDecorator('nickname5', {
                                            rules: [{ required: true, message: '请简单描述你的商品!', whitespace: true }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="商品属性"
                                    >
                                        {getFieldDecorator('residence2', {
                                            initialValue: ['热销', '推荐', '促销', '下架'],
                                            rules: [{ type: 'array', required: true, message: '请选择商品的分类!' }],
                                        })(
                                            <Cascader options={residences2} />
                                        )}
                                    </FormItem>

                                    <FormItem
                                        {...formItemLayout}
                                        label="图片上传"
                                    >
                                        <div className="clearfix">
                                            <Upload
                                                action="//jsonplaceholder.typicode.com/posts/"
                                                listType="picture-card"
                                                fileList={fileList}
                                                onPreview={this.handlePreview}
                                                onChange={this.handleChange} >
                                                {fileList.length >= 5 ? null : uploadButton}
                                            </Upload>
                                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                            </Modal>
                                        </div>
                                    </FormItem>

                                    <FormItem {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit" size="large">添加</Button>
                                    </FormItem>
                                </Form>
                            </Card>
                        </div>
                    </Col>

                </Row>

            </div>
        )
    }
}
BasicForms = withAxios(Form.create()(BasicForms));

const BasicForm2 = Form.create()(BasicForms);



export default BasicForm2;