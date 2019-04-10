import { Carousel } from 'antd';
import url from 'url';
import React, { Component } from 'react';
import withAxios from '../../hoc/withAxios';
import './goods.css'
import { async } from 'regenerator-runtime';
class goods extends Component {
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
        // this.gotolist = this.gotolist.bind(this)
        // this.gotogoods1 = this.gotogoods1.bind(this)
    }
    async componentWillMount() {
        let { axios, location } = this.props;
        let odj = url.parse(this.props.location.search, true);
        let id = odj.query.id;
        let res = await this.props.axios.post('/order_list4', {
            itemId: id
        }).then(res => {
            this.list = res.data.data[0].items;
           
        });
        this.setState({
            datalist: this.list,
        });


    }
    onChange(a, b, c) {

    }
    async addCart(idd) {
        let { itemId, name, imageUrl, minPrice,} = this.list[0];
        console.log(itemId);
        let user = sessionStorage.getItem('user');
        if (!user) {
            alert('您还没有登录，请先登录亲');
            let { history } = this.props;
            history.push({
                pathname: '/login/'
            });
            user = {};
        } else {
            user = JSON.parse(user);
            let res = await this.props.axios.post('/chongfu', {
                itemId: idd,
            }).then(res => {
                console.log(res.data.are=== 0);
                if (res.data.are === 0) {
                    var res1 =  this.props.axios.post('/addcart', {
                        itemId: itemId,
                        name: name,
                        imageUrl: imageUrl,
                        minPrice: minPrice,
                        shuliang: 1,
                        zongjia: minPrice
                    })
                } else {
                   // let shu=shuliang*1+1;
                   // console.log(shuliang)
                    let res2 =  this.props.axios.post('/upcart', {
                        itemId: itemId,
                    }).then(res2 => {
                        console.log('gai',res2)
                    })
                }
            })

        }
    }
    render() {
        return (
            <div className="home" >
                {
                    this.state.datalist.map(item => {
                        return (
                            <div key={item.itemId}>
                                <div className='main'>
                                    <div className="swiper-slide swiper-slide-active" ><h3
                                        style={{ width: '100%', backgroundColor: 'red', }}>
                                        <img src={item.imageUrl} alt="" style={{ height: '18rem', width: '100%' }} />
                                    </h3></div>

                                    <div className="phoroduct-name ng-binding" style={{
                                        marginLeft: '1rem', fontSize: '.77777778rem',
                                        color: '#4A4A4A'
                                    }}>{item.name}</div>
                                    <div style={{ marginLeft: '1rem', color: 'red', fontSize: '1rem' }}>￥{item.minPrice}</div>

                                    <div style={{ marginLeft: '17px', marginTop: '7.5px', marginBottom: '20px' }}>
                                        <div className="col-4" style={{ fontSize: '12px', color: '#9c9c9c' }}><img style={{ height: '12px', width: 'auto' }} src="../../img/littlegrey.png" /> 30天无忧退货 </div>

                                        <div className="col-4" style={{ fontSize: '12px', color: '#9c9c9c' }}><img style={{ height: '12px', width: 'auto' }} src="../../img/littlegrey.png" /> 24小时内发货 </div>

                                        <div className="col-4" style={{ fontSize: '12px', color: '#9c9c9c' }}><img style={{ height: '12px', width: 'auto' }} src="../../img/littlegrey.png" />  满88全场包邮 </div> </div>
                                    <div className='col-71' style={{ marginTop: '2rem' }}>
                                        <span className='col-5'>规格数量</span><span className='col-61'> > </span>
                                    </div>


                                    <div style={{ backgroundColor: 'white' }}> <p style={{ fontSize: '14px', marginLeft: '20px', marginTop: '2px', color: '#777777', paddingTop: '15px' }}>推荐理由</p> <p style={{ fontSize: '14px', marginTop: '15px', marginRight: '20px', marginLeft: '20px', color: '#777777', paddingBottom: '20px', marginBottom: '2px' }} className="ng-binding"> {item.desc}</p> </div>

                                    <div style={{ width: "100%" }} ng-repeat="itemDescImage in itemDescImages" className="ng-scope"> <img lazy-src="https://item.file.myhaowu.com/e0d1d023-9094-46b6-be77-602a02b69820?imageMogr2/thumbnail/640x" style={{ width: '100%', height: 'auto', opacity: '1', transition: 'opacity 1s ease 0s' }} className="ng-isolate-scope" src={item.imageUrl} /> </div>

                                </div>
                                <footer>
                                    <div ng-show="!isShowItemSelect"> <section className="bottom-toolbar ng-scope" ng-if="product.status != 3"> <div className="btn-bar ng-scope" ng-if="product.stockCount > 0"> <input id="addCart" type="button" className="have-btn2" value="立即购买" />
                                        <input id="buyNow" type="button" className="have-btn1" value="加入购物车" onClick={this.addCart.bind(this, item.itemId)} /> </div>
                                    </section></div>

                                </footer>



                            </div>
                        )
                    })
                }
            </div>

        )
    }


}
goods = withAxios(goods);
export default goods;