import React from 'react';
import { Table, Select, Button, message } from 'antd';
import withAxios from "../hoc/withAxios";


const Option = Select.Option;

class OrderList extends React.Component {
    constructor() {
        super();
        this.state = {
            columns: [{
                title: '用户名',
                dataIndex: 'name',
                key: 'name',
                render: text => <span>{text}</span>,
            }, {
                title: '数量',
                dataIndex: 'age',
                key: 'age',
            }, {
                title: '商品名',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '状态',
                dataIndex: 'secondCity',
                key: 'secondCity',
                render: text => <span style={{ color: 'blue' }}>{text}</span>
            },
            {
                title: '操作',
                key: '_id',
                dataIndex: 'tags',
                render: (tags, record) => (
                    <span>
                        <Select
                            style={{ width: 120 }}
                        >
                            <Option onClick={(e) => this.onSecondCityChange(e, record)} key={'待发货'}>待发货</Option>
                            <Option onClick={(e) => this.onSecondCityChange(e, record)} key={'运输中'}>运输中</Option>
                            <Option onClick={(e) => this.onSecondCityChange(e, record)} key={'已签收'}>已签收</Option>
                        </Select>
                        <Button onClick={(e) => this.ondel(e, record)} style={{ marginLeft: '10px' }}>删除订单</Button>

                    </span>
                ),
            }
            ],
            data: [],
        }
    }
    async componentWillMount() {
        // 请求数据
        let res = await this.props.axios.post('/listers', {
            title: "订单"
        });

        this.setState({
            data: res.data.arr,
        })
    }

    onSecondCityChange(e, record) {  //e:当前选中的 ，record:整条表单的
        // var state = e.key; //状态
        // var id = record._id; //当前id
        // console.log(record);
        this.props.axios.get('/redact', {
            params: {
                id: record._id,
                secondCity: e.key,
                key: record._id,
                name: record.name,
                age: record.age,
                address: record.address
            }
        }).then(res => {
            this.state.data.map(item => {
                if (item._id === record._id) {
                    record.secondCity = e.key;
                }
            })
            this.forceUpdate();
            if (res) { message.success('状态更改成功'); }

        })
    }

    ondel(e, record) {
        // console.log(record._id);
        this.setState({
            ...this.state,
            data: this.state.data.filter(item => item._id !== record._id)
        });
        this.props.axios.get('/userdel', {
            params: {
                lis: 'rderform',
                id: record._id
            }
        }).then(res => {
            if (res) {
                message.success('订单删除成功');
            }
        })
    }



    render() {
        return <div className="conts" >
            <Table columns={this.state.columns} dataSource={this.state.data} />
        </div>
    }
}

OrderList = withAxios(OrderList);



export default OrderList;