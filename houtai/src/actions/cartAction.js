/**
 * Action creator
 * 状态更新，提交参数设置
 */
export const ADD_TO_CART = "add_to_cart"
export const REMOVE_FROM_CART = "remove_from_cart"
export const CHANGE_QTY = "change_qty"
export const CLEAR_CART="clear_cart"

//添加
export function add(goods) {
    return {
        type: ADD_TO_CART,
        payload: goods
    }
}

//删除
export function remove(id) {
    return {
        type: REMOVE_FROM_CART,
        payload: { id }
    }
}

//修改
export function changeqty(id, qty) {
    return {
        type: CHANGE_QTY,
        payload: { id, qty }
    }
}

//清空
export function clear() {
    return {
        type: CLEAR_CART
    }
}


export default {
    add,
    remove,
    changeqty,
    clear
}