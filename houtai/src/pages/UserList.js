import React from 'react';
import {
    Table, Input, InputNumber, notification, Popconfirm, Form,
} from 'antd';
import withAxios from "../hoc/withAxios";

const data = [];


const FormItem = Form.Item;
const EditableContext = React.createContext();

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `请输入 ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class EditableTable extends React.Component {
    onSelectChange = (selectedRowKeys) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    constructor(props) {
        super(props);
        this.state = { data, editingKey: '', selectedRowKeys: [] };

        this.columns = [
            {
                title: '邮箱',
                dataIndex: 'emil',
                width: '15%',
                editable: true,
            },
            {
                title: '用户名',
                dataIndex: 'name',
                width: '35%',
                editable: true,
            }
            ,
            {
                title: '注册时间',
                dataIndex: 'time',
                width: '20%',
                editable: true,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                width: '20%',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    // 传递节点数据record
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <span
                                                onClick={() => this.save(form, record._id)}
                                                style={{ marginRight: 8 }}
                                            >保存</span>
                                        )}
                                    </EditableContext.Consumer>
                                    <Popconfirm
                                        title="确定取消?"
                                        onConfirm={() => this.cancel(record._id)}
                                    >
                                        <span>取消</span>
                                    </Popconfirm>
                                </span>
                            ) : (
                                    <span>
                                        <span style={{ display: 'inline-block', backgroundColor: 'green', width: '40px', height: '20px', marginRight: '20px', textAlign: 'center', color: '#fff' }} disabled={editingKey !== ''} onClick={() => this.edit(record._id)}>编辑</span><span style={{ display: 'inline-block', backgroundColor: '#F81D22', width: '40px', height: '20px', marginRight: '20px', textAlign: 'center', color: '#fff' }} disabled={editingKey !== ''} onClick={() => this.del(record._id, 'success')}>删除</span></span>

                                )}
                        </div>
                    );
                },
            },
        ];
    }


    async componentWillMount() {
        // 请求数据
        let res = await this.props.axios.post('/listers', {
            title: "推荐"
        });
        this.setState({
            data: res.data.arr
        })
    }

    isEditing = record => record._id === this.state.editingKey;

    // 取消保存
    cancel = () => {
        this.setState({ editingKey: '' });
    };

    // 保存更改
    save(form, _id) {
        console.log(_id)
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => _id === item._id);
            console.log(data);
            if (index > -1) {

                const item = newData[index]; //更改前
                console.log(newData);
                console.log(row) //更改后的值
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });

                this.props.axios.get('/redact', {
                    params: {
                        id: _id,
                        emil: row.emil,
                        name: row.name,
                        time: row.time,
                        key: index
                    }
                }).then(res => {
                    console.log(res);
                })

            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }
    // 编辑
    edit(_id) {
        this.setState({ editingKey: _id });
    }

    // 删除
    del(_id, type) {
        notification[type]({
            message: '温馨提示',
            description: '已为您删除当前用户',
        });
        this.setState({
            ...this.state,
            data: this.state.data.filter(item => item._id !== _id)
        });
        // 发送删除请求
        this.props.axios.get('/userdel', {
            params: {
                id: _id
            }
        })
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            selections: [{
                key: 'all-data',
                text: 'Select All Data',
                onSelect: () => {
                    this.setState({
                        selectedRowKeys: [...Array(46).keys()], // 0...45
                    });
                },
            }, {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }, {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }],
            onSelection: this.onSelection,

        }

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <div className="conts" >
                <EditableContext.Provider value={this.props.form}>
                    <Table
                        rowSelection={rowSelection}
                        components={components}
                        bordered
                        dataSource={this.state.data}
                        columns={columns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: this.cancel,
                        }}
                    />
                </EditableContext.Provider>
            </div>
        );
    }
}

EditableTable = withAxios(Form.create()(EditableTable));

const UserList = Form.create()(EditableTable);



export default UserList;