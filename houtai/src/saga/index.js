import { call, put, takeLatest,all } from "redux-saga/effects";

import {getData} from '../service';

function* fetchData (action) {
    try{
        const data=yield call(getData,'/api/cart',{page:1,qty:10});
        yield put({type:'add_to_cart',data});
    }catch(err){
        yield put({type:'add_to_cart_fall'})
    }
}

function* weatchAddToCart(params) {
    yield takeLatest('add_to_cart_async',fetchData);
}
function* weatchGetData(params) {
    yield takeLatest('add_to_cart_async',fetchData);
}

export default function*() {
    yield all([weatchAddToCart(),weatchGetData()])
}