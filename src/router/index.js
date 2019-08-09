import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/boss',
      name: 'boss',
      meta:{
        title:'BOSS钱包',
        slices:{
          bg:'/static/slices/boss_bg.png',
          btn:'/static/slices/boss_btn.png',
          logo:'/static/slices/boss_logo.png',
        },
        appType:1,
        bgcolor:{
          start:'#4ECDB1',
          end:'#38C6A7'
        },
        theme:'#53CAC3'
      },
      component: resolve=>require(['@/pages/boss.vue'],resolve)
    },
    {
      path: '/xindongdai',
      name: 'xindongdai',
      meta:{
        title:'薪动贷',
        slices:{
          bg:'/static/slices/yixiang_bg.png',
          btn:'/static/slices/yixiang_btn.png',
          logo:'/static/slices/yixiang_logo.png',
        },
        appType:3,
        bgcolor:{
          start:'#fd853a',
          end:'#FFB038'
        },
        theme:'#FA6464'
      },
      component: resolve=>require(['@/pages/yixiang.vue'],resolve)
    },
    {
      path: '/jdfq',
      name: 'jdfq',
      meta:{
        title:'借贷分期',
        slices:{
          bg:'/static/slices/jdfq-bg.png',
          btn:'/static/slices/yixiang_btn.png',
          logo:'/static/slices/jdfqlogo.png',
        },
        appType:4,
        bgcolor:{
          start:'#43BCFE',
          end:'#477BFE'
        },
        theme:'#FA6464'
      },
      component: resolve=>require(['@/pages/jdfq.vue'],resolve)
    },
    {
      path: '/laidaiba',
      name: 'laidaiba',
      meta:{
        title:'来贷吧',
        slices:{
          bg:'/static/slices/laidaiba_bg.png',
          btn:'/static/slices/laidaiba_btn.png',
          logo:'/static/slices/laidaiba_logo.png',
        },
        appType:2,
        bgcolor:{
          start:'#B0DAFF',
          end:'#B0DAFF'
        },
        theme:'#7C94F5'
      },
      component: resolve=>require(['@/pages/laidaiba.vue'],resolve)
    }
  ]
})
