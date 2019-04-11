import React, { Component } from 'react';
import Interface from '@/interface';
import classList from './index.module.scss';
import net from '@/net/index';

export default class extends Component {
  goto() {
    Interface.goto('/news');
  }
  resize() {
    console.log('resize')
  }
  componentDidMount() {
    net.GET('/').then((res)=> {
      return res;
    })
  }
  componentWillUnmount() {
  }
  render() {
    return <div className={classList.main} onClick={this.goto}>news</div>
  }
}