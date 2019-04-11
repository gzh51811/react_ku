import React from 'react';

import { Table, Icon } from 'antd';
import axios from 'axios';
import withAxios from '../hoc/withAxios';


// @withAxios
class myTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tDate: [],
            selectedRowKeys: [],
            data: [],
            datalist: [],
            shu: [],
            li: []


        };
        this.handleClick = this.handleClick.bind(this);
    }


    async componentWillMount() {
        let { data } = await axios.get('/order', {
            params: {
            }
        })

        console.log(data);
        //  var datalist=data.slice(0, 2);
        //   var datalist=data;
        //     console.log(datalist);

        var datalist = [];
        // var li = []
        data.map((items) => {
            return items;
        });
        datalist.push(data[0].items, data[1].items, data[3].items, data[4].items, data[5].items);
        //    li=JSON.stringify(datalist);
        console.log(datalist);


        this.setState({
            // data:datalist[0]
            //  datalist:data[0].items
            //datalist:li 
            datalist: datalist[1]
            //  li:li
            //    datalist:datalist

        });

        //console.log(datalist)     
        //    console.log(this.state);
    }




    // checkbox状态
    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
    }

    handleClick = () => {
        alert("123");

    }



    render() {

        const columns = [{
            title: 'ID',
            width: '15%',
            dataIndex: 'imageKey'
        }, {
            title: '商品名称',
            width: '30%',
            dataIndex: 'name'
        }, {
            title: '分类',
            width: '10%',
            dataIndex: '',
        },
        {
            title: '售价',
            width: '10%',
            dataIndex: 'minPrice'
        }, {
            title: '库存',
            width: '10%',
            dataIndex: 'status'
        }, {
            title: '状态',
            width: '10%',
            dataIndex: ''
        },
        {
            title: '操作',
            width: '15%',
            dataIndex: '',
            render() {

                return (

                    <div className="tree_node_op"  >
                        <i-switch value="{params.row.status}" size="large" slot="footer">
                            <a href={{ javascript: void (0) }} onClick={(e) => this.handleClick(e)} ><view slot="open"><Icon type="edit" /></view></a>

                            <a href={{}} ><view slot="close"><Icon type="delete" /></view></a>
                        </i-switch>
                        <a href={{}} > <i-button type='text'>上架</i-button> </a>


                    </div>

                )
            }
        }]
        //operate
        const { selectedRowKeys } = this.state

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this)
        }

        const pagination = {
            total: this.state.tDate.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize)
            },
            onChange(current) {
                console.log('Current: ', current)
            }
        }

        return (

            <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.datalist} bordered pagination={pagination} />





        )
    }



}

myTable = withAxios(myTable);

export default myTable;

