
import { createStore, applyMiddleware } from "redux";
// 引入状态更新逻辑
import rootReducer from "./reducers";

//1.引入创建方法
import createSagaMiddleware from 'redux-saga';
// redux使用插件程序方法
// import { composeWithDevTools } from 'redux-devtools-extension';
// composeWithDevTools()

import rootSaga from "./saga";

// 2.创建saga中间件
const sagaMiddleware = createSagaMiddleware();

// 创建一个store存储区
// 3.将sagaMiddleware连接到Store
let store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
//rootReducer为一个纯函数，用于设定state修改逻辑（如何修改state中的数据）

// 4.运行Saga配置
sagaMiddleware.run(rootSaga);

export default store;