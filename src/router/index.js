import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routerMaps=[
  {
    path: '/',
    name: 'page1',
    component: 'Page1'
  },
  {
    path: '/page2',
    name: 'page2',
    component: 'Page2'
  }
];
function ansysLoad(item){
  return (resolve)=>{
      import (/* webpackChunkName: item.name */(`../views/${item.name}/index.vue`)).then(
        (module)=>{
          resolve(module)
        }
      )
  }
}

const routers=routerMaps.map((item)=>{
    let component;
    if(typeof item.component==='object'){
      component=item.component;
    }else if(typeof item.component==='string'){
      component=ansysLoad(item);
    }
    return Object.assign(item,{component});

})
export default new Router({
  routes:routers
})
