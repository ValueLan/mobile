import React, { Component } from 'react';
import Interface from '@/interface';
import classList from './index.module.scss';

export default class extends Component {
  goto() {
    Interface.goto('/about');
  }
  render() {
    return <div className={classList.main} onClick={this.goto}>998</div>
  }
}