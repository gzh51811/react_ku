import React from "react";
import axios from 'axios';
axios.defaults.baseURL='http://localhost:1814';
export default (Com)=>{
    return function (props,context) {
        return <Com axios={axios}{...props}{...context}></Com>
    }

}