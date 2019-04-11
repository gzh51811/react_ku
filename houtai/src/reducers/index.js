/**
 * 状态更新逻辑选择
 */

// 处理多个Reducer：combineReducers
import { combineReducers } from "redux";

// 引入不同页面的操作规则reducer
import cartReducer from "./cartReducer";
import commonReducer from "./commonReducer";

// 以对象形式暴露
const rootReducers = combineReducers({
    comon: commonReducer,
    cart: cartReducer
})

export default rootReducers;