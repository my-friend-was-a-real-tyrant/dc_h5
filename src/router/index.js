import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/boss',
      name: 'boss',
      meta: {
        title: 'BOSS钱包',
        slices: {
          bg: '/static/slices/boss_bg.png',
          btn: '/static/slices/boss_btn.png',
          logo: '/static/slices/boss_logo.png',
        },
        appType: 1,
        bgcolor: {
          start: '#4ECDB1',
          end: '#38C6A7'
        },
        theme: '#53CAC3'
      },
      component: resolve => require(['@/pages/boss.vue'], resolve)
    },
    {
      path: '/xindongdai',
      name: 'xindongdai',
      meta: {
        title: '薪动贷',
        slices: {
          bg: '/static/slices/yixiang_bg1.jpg',
          btn: '/static/slices/yixiang_btn.png',
          logo: '/static/slices/yixiang_logo.png',
        },
        appType: 3,
        bgcolor: {
          start: '#fd853a',
          end: '#FFB038'
        },
        theme: '#FA6464'
      },
      component: resolve => require(['@/pages/yixiang.vue'], resolve)
    },
    {
      path: '/jdfq',
      name: 'jdfq',
      meta: {
        title: '借贷分期',
        slices: {
          bg: '/static/slices/jdfq-bg.png',
          btn: '/static/slices/yixiang_btn.png',
          logo: '/static/slices/jdfqlogo.png',
        },
        appType: 4,
        bgcolor: {
          start: '#43BCFE',
          end: '#477BFE'
        },
        theme: '#FA6464'
      },
      component: resolve => require(['@/pages/jdfq.vue'], resolve)
    },
    {
      path: '/fxqb',
      name: 'fxqb',
      meta: {
        title: '放薪钱包',
        slices: {
          bg: '/static/slices/fxqb_bg.png',
          btn: '/static/slices/fxqb_btn.png',
          logo: '/static/slices/fxqb_logo.png',
        },
        appType: 8,
        bgcolor: {
          start: '#272556',
          end: '#272556'
        },
        theme: '#3AA0FE'
      },
      component: resolve => require(['@/pages/fxqb.vue'], resolve)
    },
    {
      // /#/xzd?push_str=CSXZD
      path: '/xzd',
      name: 'xzd',
      meta: {
        title: '薪转贷',
        slices: {
          bg: '/static/slices/xzd_banner.png',
          btn: '/static/slices/xzd_btn.png',
          logo: '/static/slices/xzd_logo.png',
        },
        appType: 7,
        bgcolor: {
          start: '#82A8F6',
          end: '#777FF2'
        },
        theme: '#FFCC00'
      },
      component: resolve => require(['@/pages/xzd.vue'], resolve)
    },
    {
      path: '/laidaiba',
      name: 'laidaiba',
      meta: {
        title: '来贷吧',
        slices: {
          bg: '/static/slices/laidaiba_bg.png',
          btn: '/static/slices/laidaiba_btn.png',
          logo: '/static/slices/laidaiba_logo.png',
        },
        appType: 2,
        bgcolor: {
          start: '#B0DAFF',
          end: '#B0DAFF'
        },
        theme: '#7C94F5'
      },
      component: resolve => require(['@/pages/laidaiba.vue'], resolve)
    }
  ]
})
