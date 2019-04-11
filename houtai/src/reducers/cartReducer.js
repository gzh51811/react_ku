/**
 * Cart Reducer
 * 有关购物车的规则
 */

import { ADD_TO_CART, REMOVE_FROM_CART, CHANGE_QTY,CLEAR_CART } from '../actions/cartAction'


let initState = {
    goodslist: []
}



let reduct = (state = initState, { type, payload }) => {
    // state:上一次的状态
    // action：修改指令
    // 返回值：返回新的state
    // type：传入的类型
    switch (type) {
        // 添加商品到购物车
        case ADD_TO_CART:
            return {
                ...state,
                goodslist: [...state.goodslist, payload]
            }
        // 删除商品
        case REMOVE_FROM_CART:
            return {
                ...state,
                goodslist: state.goodslist.filter(item => item.goods_id !== payload.id)
            }
        // 修改商品数量
        case CHANGE_QTY:
            return {
                ...state,
                goodslist: state.goodslist.map(goods => {
                    if (goods.goods_id === payload.id) {
                        goods.qty = payload.qty
                    }
                    return goods;
                })
            }
        // 清空购物车
        case CLEAR_CART:
            return {
                ...state,
                goodslist: []
            }
        default:
            return state;

    }
}

export default reduct;
