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
        },
        appType:1,
        bgcolor:{
          start:'#4ECDB1',
          end:'#38C6A7'
        }
      },
      component: resolve=>require(['@/pages/boss.vue'],resolve)
    },
    {
      path: '/yixiang',
      name: 'yixiang',
      meta:{
        title:'壹向钱站',
        slices:{
          bg:'/static/slices/yixiang_bg.png',
          btn:'/static/slices/yixiang_btn.png',
        },
        appType:3,
        bgcolor:{
          start:'#fd853a',
          end:'#FFB038'
        }
      },
      component: resolve=>require(['@/pages/yixiang.vue'],resolve)
    },
    {
      path: '/laidaiba',
      name: 'laidaiba',
      meta:{
        title:'来贷吧',
        slices:{
          bg:'/static/slices/laidaiba_bg.png',
          btn:'/static/slices/laidaiba_btn.png',
        },
        appType:2,
        bgcolor:{
          start:'#B0DAFF',
          end:'#B0DAFF'
        }
      },
      component: resolve=>require(['@/pages/laidaiba.vue'],resolve)
    }
  ]
})
