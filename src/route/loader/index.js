import React, { Component } from 'react';

export default (loader) => {
  return class extends Component {
    state = {
      component: null,
      error: false
    }
    reload = () => {
      this.setState({error: false});
      loader()
      .then(cmp => {
        this.setState({component: cmp.default});
      }).catch((...args) => {
        this.setState({error: true});
      });
    }
    componentWillMount() {
      this.reload();
    }
    render() {
      if (this.state.error) return <div>模块加载失败，<a href="javascript:;" onClick={this.reload}>点击重新加载</a></div>
      const Com = this.state.component;
      if (!Com) return <div style={{position: 'absolute', top: '50%', margin: '-29px 0 0 -29px', left: '50%'}}>
                  loading
                </div>
      return <Com {...this.props} />;
    }
  }
};