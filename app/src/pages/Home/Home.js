import React, { Component } from 'react';
import { render } from 'react-dom';
import { Carousel } from 'antd';
import './home.css';   
ReactDOM.render(
    <Carousel autoplay>
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </Carousel>,
    mountNode
  );


export default Home;
/* For demo */
