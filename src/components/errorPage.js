import React from 'react';

const PageNotFound = ()=>(
    <div className="page-not-found">Page not found</div>
);

export default PageNotFound;


/**
 * 1. 在PageNotFound组件的this.props可以获取以下属性
  {
    children:null
    location: Object
    params: Object
    route: Object
    routeParams: Object
    router: Object
    routes: Array
  }

 2. 改为了函数式组件
 *
 * */