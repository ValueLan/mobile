import React, { Component } from 'react';
import './router';
import event from '@/utils/event';
import utils from '@/utils';
import getModule from './getModule';

export default class extends Component {
  state = {
    first: null, // first module
    last: null, // last module
    animateing: false,
    showMode: true, // ture == true 实现 first div. 否则显示 last div
    mode: void 0
  }
  componentDidMount() {
    event.on('URL_CHANGE', (...arg) => this.operatUrl(...arg));
    this.operatUrl();
  }
  operatUrl(key) {
    let getAnimateState = () => {
      if (!key || key == 'URL_REPLACE') return false;
      return true;
    }

    let getShowMode = () => {
      if (!key || key == 'URL_REPLACE') return this.state.showMode;
      return !this.state.showMode;
    }

    let showMode = getShowMode();
    let animateing = getAnimateState();
    let pointerKey = showMode ? 'first' : 'last';
    let direction = key == 'URL_BACK' ? 'ltr' : 'rtl';

    let getMode = (isPrev) => {
      if (!animateing) {
        if (showMode) return 1;
        return 3
      }

      if (showMode) {
        if (direction == 'rtl') {
            if (isPrev) return 3;
            return 2;
        }
        if (isPrev) return 4;
        return 1;
      }

       if (direction == 'rtl') {
            if (isPrev) return 1;
            return 4;
        }
        if (isPrev) return 2;
        return 3;
    }

    this.setState({
      [ pointerKey ]: getModule(),
      showMode,
      animateing: false,
      mode: getMode(true)
    }, () => {
      if (!animateing) return;
      setTimeout(() => {
        this.setState({
          animateing,
          mode: getMode()
        });
      }, 1000 / 30);
    });
  }
  getFirstStyle() {
    let result = {}
    switch (this.state.mode) {
        case 1:
        case 2:
          result['transform'] = 'translate3d(0, 0, 0)';
        break;
        case 3:
          result['transform'] = 'translate3d(100%, 0, 0)';
        break;
        case 4:
          result['transform'] = 'translate3d(-100%, 0, 0)';
        break;
    }

    if (this.state.animateing) result['transition'] = 'transform 0.3s';
    return result;
  }
  getLastStyle() {
    let result = {};
    if (this.state.animateing) result['transition'] = 'transform 0.3s';

    switch (this.state.mode) {
        case 3:
        case 4:
          result['transform'] = 'translate3d(0, 0, 0)';
        break;
        case 1:
          result['transform'] = 'translate3d(100%, 0, 0)';
        break;
        case 2:
          result['transform'] = 'translate3d(-100%, 0, 0)';
        break;
    }
    return result;
  }
  renderFirst() {
    const First = this.state.first;
    if (First) return First;
  }
  renderLast() {
    const Last = this.state.last;
    if (Last) return Last;
  }
  render() {
    return <div className="router-box">
              <div style={this.getFirstStyle()} className="animate-box">
                  {this.renderFirst()}
               </div>
              <div style={this.getLastStyle()} className="animate-box">
                  {this.renderLast()}
              </div>
           </div>
  }
}