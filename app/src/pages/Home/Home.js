import React, { Component } from 'react';
import { render } from 'react-dom';
import { Carousel, Icon } from 'antd';
import 'regenerator-runtime/runtime'
import withAxios from '../../hoc/withAxios';
import './home.css';
import 'antd/dist/antd.css';
// @withAxios
class Home extends Component {
  constructor() {
    super();
    this.state = {
        iten:[],
        itentop:[],
        list:[],
        datalist: [],
        activeType: 0
    }
    this.gotogoods=this.gotogoods.bind(this)
}
//用到生命周期函数，在渲染之前发送请求
async componentWillMount() {
    //console.log(this);
    //使用axios 发起请求
    let res = await this.props.axios.post('/list', {
      type:'推荐'
    }).then(res => {
      this.list = res.data.arr
      console.log(this.list)
      // this.datalist=this.list[0].data
    });
    let res1 = await this.props.axios.post('/order_list', {
      name:''
    }).then(res1 => {
      console.log(res1);
      this.iten = res1.data.arr
      // this.datalist=this.list[0].data
    });
  console.log( this.iten );
    this.setState({
        itentop:this.iten,
        datalist: this.list[0].items
    });

}
gotogoodss(idd){
  console.log(idd,this)
  let { history } = this.props;
  history.push({
    pathname: '/goods/' + idd,
    search: '?id=' + idd,
    state: {
        idd
    }
  })
 
}
gotogoods(name){
   var that = this;
    console.log(this)
    let {history}=this.props;
    history.push({
        pathname:'/list/'+name,
        search:'?text='+name,
        state:{
            name
        }
    })
}
  render() {
    return (
      <div className='Home_contarin'>
          <ul className='Home_top'>
          <li className=''>推荐</li>
          {
             this.state.itentop.map(goods=>{
               return(
                <li key={goods.name} onClick={this.gotogoods.bind(this,goods.name)}>{goods.name}</li>
               )
             })
          }
         
        </ul>
        <Carousel autoplay style={{boxSizing:"border-box"}}>
          <div  style={{width:'100%'}}>
            <img src="https://item.file.myhaowu.com/e4d19fbd-1412-43de-8749-802e2f101378?imageMogr2/thumbnail/640x" alt="" style={{width:'100%'}}/>
            </div>
          <div  style={{width:'100%'}}>
            <img src="https://item.file.myhaowu.com/a6dffca4-5be7-487c-b7fc-eb01a50deaf4?imageMogr2/thumbnail/640x" alt="" style={{width:'100%'}}/>
            </div>
          <div  style={{width:'100%'}}>
            <img src="https://item.file.myhaowu.com/c716d1c0-4094-4cd6-899f-13638037efa7?imageMogr2/thumbnail/640x" alt="" style={{width:'100%'}}/> 
            </div>
        </Carousel>
        <div className='Home_gon'>
          <p><Icon type="notification" style={{ fontSize: '16px', color: '#FFD914' }} />  好物公告  退换货说明</p>
        </div>
        <div className='gradient-bg'>
        <div className='Home_xin'>
          <div className="recommend-new-title">周一周四 - 新品首发</div>
        </div>
        <div className='recommend-new-content'>
          <div className="recommend-new-box">
            <img src="https://item.file.myhaowu.com/1448a172-c43f-4d57-90e2-5a9e17a8c71d?imageMogr2/thumbnail/640x" style={{borderRadius:'4px'}}></img>
            <div className='Home_con'>
              <p style={{ fontWeight: 'bold' }}>Love</p>
            </div>
            <div className='Home_con'>
              <p style={{ color: 'darkgray' }}>恋爱100事</p>
            </div>
            <div className='Home_con' >
              <p><span style={{ color: 'red' }}>￥99</span><span style={{ color: '#ccc', textDecoration: 'line-through', marginLeft: '.266667rem' }}> ￥99</span></p>
            </div>
          </div>
        </div>
        <div className="recommend-new-bottom">
          查看所有新品 &gt;</div>
          </div>
        <div className='recommend-item'>
          <div className="recommend-item-title">为你推荐</div>
          {
          this.state.datalist.map(goods=>{
          return ( 
          <div key={goods.itemId} >
          <div className="recommend-item-content ng-scope">
          <div className="swiper-container recommend-swiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide ng-scope" >
            
                  <img  style={{width:' 100%', opacity: '1',transition: 'opacity 1s ease 0s'}} className="re-item-img swiper-lazy img-border-radius ng-isolate-scope" src={ goods.itemImages[0].imageUrl } /> 
              </div>
            </div>
            <div className="swiper-pagination"></div>
          </div>
          <div className="recommend-item-name ng-binding">{goods.name}</div>
          <div className="recommend-item-desc ng-binding">{goods.desc}</div>
          <div className="recommend-item-other">
          <div className="re-item-o-price ng-binding ng-scope">￥{goods.minPrice}</div><a  href="#"> 
          <button className="btn-price">购买</button> </a> </div> 
          </div>
    </div>
          
    )
  })
}
</div>
<div className="icon-bottom-bg" id="bottomBg"></div>
</div>
    )
}
}
Home=withAxios(Home);
export default Home;
    /* For demo */
