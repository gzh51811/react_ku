import React, { Component } from 'react';
import { Carousel, Alert, Upload } from 'antd';
import './cart.css'
import withAxios from '../../hoc/withAxios';
import { async } from 'regenerator-runtime';
class cart extends Component {
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
    async componentDidMount() {
        let res = await this.props.axios.post('/cart', {
        }).then(res => {
            this.list = res.data.arr;
        });
        this.setState({
            datalist: this.list,
        });
    }
    onChange(a, b, c) {

    }
    delete(idx) {
        console.log(idx);


        (async del => {
            let res = await this.props.axios.post('/delete', {
                itemId: idx
            }).then(res => {
                this.datalist = res.data.arr;
            });
            this.setState({
                datalist: this.datalist,
            });
        })();

    }
    add(id) {
        var tex = document.querySelector('#vl').value;
        var tex1 = tex * 1 + 1;
        (async load => {
            let res = await this.props.axios.post('/updata', {
                itemId: id,
                shuliang: tex1
            }).then(res => {
                console.log(res)
                this.datalist = res.data.arr;
            });
            this.setState({
                datalist: this.datalist,
            });
        })();
    }
    jian(id) {
        var tex = document.querySelector('#vl').value * 1;
        if (tex > 1 && tex !== 1) {
            var tex1 = tex * 1 - 1;
            (async load => {
                let res = await this.props.axios.post('/updata', {
                    itemId: id,
                    shuliang: tex1
                }).then(res => {
                    console.log(res)
                    this.datalist = res.data.arr;
                });
                this.setState({
                    datalist: this.datalist,
                });
            })();
        } else {
            document.querySelector('#vl').value = tex;
        }

    }
    render() {
        return (
            <div className='cart'>
                <div className='top' style={{ borderBottom: '1.7px solid #f2f2f2' }}>
                    <div style={{ marginLeft: '17px', marginTop: '7.5px', marginBottom: '20px' }}>
                        <div className="col-4" style={{ fontSize: '12px', color: '#9c9c9c' }}><img style={{ height: '12px', width: 'auto' }} src="../../img/littlegrey.png" /> 30天无忧退货 </div>

                        <div className="col-4" style={{ fontSize: '12px', color: '#9c9c9c' }}><img style={{ height: '12px', width: 'auto' }} src="../../img/littlegrey.png" /> 24小时内发货 </div>

                        <div className="col-4" style={{ fontSize: '12px', color: '#9c9c9c' }}><img style={{ height: '12px', width: 'auto' }} src="../../img/littlegrey.png" />  满88全场包邮 </div>
                    </div>
                </div>
                <ul className='caerlist'>
                    {
                        this.state.datalist.map(item => {
                            return (
                                <li key={item.itemId} className='listli'>
                                    <div className='box1'>
                                        <input type="checkbox" />
                                    </div>
                                    <div className='box2'>
                                        <img src={item.imageUrl} alt="" />
                                    </div>
                                    <div className='box3'>
                                        <div>
                                            <span className="item-cart-content-title ng-binding" ng-click="cart.Handle.goItemDetail(item)">{item.name}</span>
                                        </div>
                                        <div>
                                            <span className="select-box clearfix">
                                                <i type="button" className='select-btn select-btn-l-radius icon-sub' onClick={this.add.bind(this, item.itemId)}>+</i>
                                                <input type="text" className='select-num ng-pristine ng-untouched ng-valid ng-not-empty' value={item.shuliang} onChange={this.onChange} id='vl' />
                                                <i type='button' className='select-btn select-btn-r-radius icon-plus' onClick={this.jian.bind(this, item.itemId)}>-</i> </span>
                                        </div>
                                    </div>
                                    <div className='box4'>
                                        <div style={{ height: '3rem', textAlign: 'center' }}>
                                            <i className="icon-delete" >
                                                <img style={{ width: '.83333333rem', height: '.94444444rem' }} src="../../img/icon-delete.png" alt="" onClick={this.delete.bind(this, item.itemId)} /></i>
                                        </div>
                                        <div>
                                            <div className="pay-price ng-binding">￥{item.zongjia * item.shuliang}</div>
                                        </div>
                                    </div>
                                </li>
                            )

                        })
                    }
                </ul>
                <div className='foot'>
                    <div className='foot1'>
                        <input type="checkbox" /><span className="check-all-text">全选</span>
                    </div>
                    <div className='foot2'>
                        总计（不含运费）：<span style={{ color: 'red' }}>￥0</span>
                    </div>
                    <div className='foot3'>
                        <input type="button" className="have-btn1" value="立即下单" ng-click="orderNow()"></input>
                    </div>
                </div>

            </div>

        )

    }
}
cart = withAxios(cart);
export default cart;