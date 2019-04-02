import React from "react";
import axios from 'axios';
axios.defaults.baseURL='https://www.nanshig.com';
export default (Com)=>{
    return function (props,context) {
        return <Com axios={axios}{...props}{...context}></Com>
    }

}