webpackJsonp([3],{KMeU:function(t,e){},ekMz:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("Fd2+"),s=(i("GKy3"),i("NC6I")),a=i.n(s),o={data:function(){return{telphone:"",code:"",wait:0,deviceType:null,downurl:""}},mounted:function(){this.set_device(),this.send_BP(1),this.listens()},methods:{start_wait:function(){var t=this;this.wait=60;var e=null;e=setInterval(function(){t.wait>0?t.wait--:clearInterval(e)},1e3)},send_sms:function(){this.handle_submit()},listens:function(){var t,e,i,n;n=void 0,t=""+window.navigator.userAgent.toLowerCase(),e=/MicroMessenger/i.test(t),i=/\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(t),e&&i&&(document.body.addEventListener("focusin",function(){clearTimeout(n)}),document.body.addEventListener("focusout",function(){clearTimeout(n),n=setTimeout(function(){window.scrollTo({top:0,left:0,behavior:"smooth"})},100)}))},set_device:function(){var t=navigator.userAgent,e=(navigator.appVersion,t.indexOf("Android")>-1||t.indexOf("Linux"),!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/));this.deviceType=e?2:1},download:function(){window.location.href=this.downurl},handle_submit:function(){var t=this;this.$axios.post("https://api.haoxianghuaqian.com/login?platform=3",{main_channel:this.$route.meta.appType,t:this.$get_time(),app_version:"1.0",push_str:this.$route.query.push_str?this.$route.query.push_str:"",phone:this.telphone,code:this.code}).then(function(e){200==e.code?(n.a.success(e.msg),t.send_BP(2)):n.a.fail(e.msg)}).catch(function(t){})},send_BP:function(t){var e=this;this.$axios.post("https://api.haoxianghuaqian.com/h5?platform=3",{main_channel:this.$route.meta.appType,t:this.$get_time(),app_version:"1.0",push_str:this.$route.query.push_str?this.$route.query.push_str:"",type:t,pingtai:this.deviceType,uniq:this.uniq()}).then(function(i){200==i.code&&"downurl"in i.data&&(e.downurl=i.data.downurl,2==t&&e.download())})},uniq:function(){return localStorage.getItem("uniq")?localStorage.getItem("uniq"):(localStorage.setItem("uniq",a()(Math.random().toString())),localStorage.getItem("uniq"))}}},r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"boss",style:"background: linear-gradient("+t.$route.meta.bgcolor.start+","+t.$route.meta.bgcolor.end+");"},[i("div",{staticClass:"bg"},[i("img",{staticClass:"bg-img",attrs:{src:t.$route.meta.slices.bg,alt:""}})]),t._v(" "),i("div",{staticClass:"main"},[i("div",{staticClass:"panel"},[i("div",{staticClass:"tip"},[t._v("用钱就找来贷吧")]),t._v(" "),i("div",{staticClass:"input-box"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.telphone,expression:"telphone"}],attrs:{type:"text",placeholder:"请输入手机号"},domProps:{value:t.telphone},on:{input:function(e){e.target.composing||(t.telphone=e.target.value)}}})]),t._v(" "),i("div",{staticClass:"input-box"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],attrs:{type:"text",placeholder:"请输入验证码"},domProps:{value:t.code},on:{input:function(e){e.target.composing||(t.code=e.target.value)}}}),t._v(" "),i("span",{staticClass:"send-btn-2",class:t.wait>0?"disabled":"",on:{click:t.send_sms}},[t._v(t._s(t.wait>0?"重新发送（"+t.wait+"秒）":"获取验证码"))])]),t._v(" "),i("div",{staticClass:"submit-btn",on:{click:t.handle_submit}},[i("img",{staticClass:"btn-img",attrs:{src:t.$route.meta.slices.btn,alt:""}}),t._v(" "),i("span",{staticClass:"text"},[t._v("立即拿钱")])])])])])},staticRenderFns:[]};var c=i("VU/8")(o,r,!1,function(t){i("KMeU")},null,null);e.default=c.exports}});
//# sourceMappingURL=3.b988ea0777abcbee5bdb.js.map