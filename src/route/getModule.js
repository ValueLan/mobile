import React, { Component } from 'react';
import Loader from './loader';
import utils from '@/utils/index';

const list = {
  "/": Loader(()=> import('@/page/index')),
  "/news": Loader(()=> import('@/page/news')),
  "/about": Loader(()=> import('@/page/about'))
}

class Undefined extends Component {
  render() {
    return <div>404</div>; 
  }
}

export default function() {
  let query = utils.getQuery();
  let Module = list[location.pathname];
  if (!list[location.pathname]) Module = Undefined
  return <Module query={query} />;
}