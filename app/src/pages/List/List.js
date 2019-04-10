import React, { Component } from 'react';
import withAxios from '../../hoc/withAxios';
import url from 'url';
import './list.css'
import { async } from 'regenerator-runtime';
class List extends Component {
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
        this.gotolist = this.gotolist.bind(this)
        this.gotogoods1 = this.gotogoods1.bind(this)


    }
    //用到生命周期函数，在渲染之前发送请求
    async componentWillMount() {
        //console.log(this);
        //使用axios 发起请求
        // console.log(this.props);
        let { axios, location } = this.props;
        let odj = url.parse(this.props.location.search, true);
        let name = odj.query.text;
        //console.log(name);
        let res = await this.props.axios.post('/order_list1', {
            name: name
        }).then(res => {
            // console.log(res)
            this.list = res.data.arr;
            this.list1 = res.data.arr;
            this.list2 = this.list1[0].items;
            //console.log(this.list2);

        });
        let res1 = await this.props.axios.post('/order_list', {
            name: ''
        }).then(res1 => {
            this.iten = res1.data.arr

        });

        this.setState({
            itentop: this.iten,
            datalist: this.list,
            list3: this.list2
        });

    }
    gotogoods(name) {
        //console.log(this)
        let { history } = this.props;
        history.push({
            pathname: '/list/' + name,
            search: '?text=' + name,
            state: {
                name
            }
        })
    }
    gotogoods1=(idd)=> {
        console.log(idd)
        let { history } = this.props;
        history.push({
            pathname: '/goods/' + idd,
            search: '?id=' + idd,
            state: {
                idd
            }
        })
    }
    gohome(){
        let { history } = this.props;
        history.push({
            pathname: '/home/' ,
        })
    }
    gotolist = (name) => {
        (async gitr => {
            let res = await this.props.axios.post('/order_list1', {
                name: name
            }).then(res => {
                console.log(res)
                this.list = res.data.arr;
                this.list1 = res.data.arr;
                this.list2 = this.list1[0].items;
                console.log(this.list2);

            });

            this.setState({
                itentop: this.iten,
                datalist: this.list,
                list3: this.list2,

            });
        })();

    }
    render() {
        return (
            <div className='list'>
                <ul className='Home_top'>
                    <li className='active-tab' onClick={this.gohome.bind(this)} >推荐</li>
                    {
                        this.state.itentop.map(goods => {
                            return (<li key={goods.name} onClick={(e) => { this.gotolist(goods.name) }}>{goods.name}</li>
                            )
                        })
                    }
                </ul>

                {
                    this.state.datalist.map(goods1 => {
                        return (
                            <div key={goods1.name}>
                                <div className='bed-item-banner' >
                                    <img src={goods1.imageUrl} alt="" className='bed-item-banner' />
                                </div>
                            </div>
                        )
                    })
                }
                {
                    this.state.list3.map(goods2 => {
                        return (
                            <div key={goods2.itemId} onClick={this.gotogoods1.bind(this,goods2.itemId)} style={{ cursor: 'pointer'}}>
                                <div className='recommend-new-content' style={{ width: '9.35rem', float: 'left', height: '11rem'}}  >
                                    <div className="recommend-new-box">
                                        <img src={goods2.imageUrl} style={{ borderRadius: '4px', width: '8.2rem' }} 
                                       ></img>
                                        <div className='Home_con'>
                                            <p style={{ fontSize: '.5rem', color: '#4a4a4a', marginTop: '.55555556rem', textAlign: 'center' }}>{goods2.name}</p>
                                        </div>
                                        <div className='Home_con' >
                                            <p style={{
                                                fontSize: '.66666667rem',
                                                color: '#FE767A',
                                                marginTop: '.55555556rem',
                                                textAlign: 'center',
                                                marginBottom: '.55555556rem'
                                            }}><span>￥{goods2.minPrice}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )


                    })
                }


            </div>
        )
    }
}


List = withAxios(List);
export default List;