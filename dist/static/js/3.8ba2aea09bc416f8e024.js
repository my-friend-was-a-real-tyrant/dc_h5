webpackJsonp([3],{ZLGl:function(t,s){},ekMz:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("Fd2+"),a=(e("GKy3"),e("NC6I")),n=e.n(a),o={data:function(){return{telphone:"",code:"",wait:0,deviceType:null,downurl:"",status:0,showRegd:!1,submit_res_data:null,show_download:!1}},mounted:function(){this.set_device(),this.send_BP(1),this.listens()},methods:{start_wait:function(){var t=this;this.wait=60;var s=null;s=setInterval(function(){t.wait>0?t.wait--:clearInterval(s)},1e3)},show_success:function(){},send_sms:function(){this.handle_submit()},listens:function(){var t,s,e,i;i=void 0,t=""+window.navigator.userAgent.toLowerCase(),s=/MicroMessenger/i.test(t),e=/\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(t),s&&e&&(document.body.addEventListener("focusin",function(){clearTimeout(i)}),document.body.addEventListener("focusout",function(){clearTimeout(i),i=setTimeout(function(){window.scrollTo({top:0,left:0,behavior:"smooth"})},100)}))},set_device:function(){var t=navigator.userAgent,s=(navigator.appVersion,t.indexOf("Android")>-1||t.indexOf("Linux"),!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/));this.deviceType=s?2:1},download:function(){this.show_download=!0,this.showRegd=!1,window.location.href=this.downurl},handle_submit:function(){var t=this;this.$axios.post("https://api.haoxianghuaqian.com/login?platform=3",{main_channel:this.$route.meta.appType,t:this.$get_time(),app_version:"1.0",push_str:this.$route.query.push_str?this.$route.query.push_str:"",phone:this.telphone,code:this.code}).then(function(s){200==s.code?(t.send_BP(2),0==s.data.is_new?(t.submit_res_data=s.data,t.showRegd=!0):(i.a.success(s.msg),t.download())):i.a.fail(s.msg)}).catch(function(t){})},send_BP:function(t){var s=this;this.$axios.post("https://api.haoxianghuaqian.com/h5?platform=3",{main_channel:this.$route.meta.appType,t:this.$get_time(),app_version:"1.0",push_str:this.$route.query.push_str?this.$route.query.push_str:"",type:t,pingtai:this.deviceType,uniq:this.uniq()}).then(function(t){s.status=t.data.status,200==t.code&&"downurl"in t.data&&(s.downurl=t.data.downurl)})},uniq:function(){return localStorage.getItem("uniq")?localStorage.getItem("uniq"):(localStorage.setItem("uniq",n()(Math.random().toString())),localStorage.getItem("uniq"))}}},c={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{directives:[{name:"show",rawName:"v-show",value:1==t.status,expression:"status == 1"}],staticClass:"boss",style:"background: linear-gradient("+t.$route.meta.bgcolor.start+","+t.$route.meta.bgcolor.end+");"},[e("div",{staticClass:"bg"},[e("img",{staticClass:"bg-img",attrs:{src:t.$route.meta.slices.bg,alt:""}})]),t._v(" "),e("div",{staticClass:"main"},[e("div",{staticClass:"panel"},[e("div",{staticClass:"tip"},[t._v("用钱就找来贷吧")]),t._v(" "),e("div",{staticClass:"input-box"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.telphone,expression:"telphone"}],attrs:{type:"text",placeholder:"请输入手机号"},domProps:{value:t.telphone},on:{input:function(s){s.target.composing||(t.telphone=s.target.value)}}})]),t._v(" "),e("div",{staticClass:"input-box"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],attrs:{type:"text",placeholder:"请输入验证码"},domProps:{value:t.code},on:{input:function(s){s.target.composing||(t.code=s.target.value)}}}),t._v(" "),e("span",{staticClass:"send-btn",class:t.wait>0?"disabled":"",on:{click:t.send_sms}},[t._v(t._s(t.wait>0?"重新发送（"+t.wait+"秒）":"获取验证码"))])]),t._v(" "),e("div",{staticClass:"submit-btn",on:{click:t.handle_submit}},[e("img",{staticClass:"btn-img",attrs:{src:t.$route.meta.slices.btn,alt:""}}),t._v(" "),e("span",{staticClass:"text"},[t._v("立即拿钱")])])])]),t._v(" "),t.showRegd?e("div",{staticClass:"dialog",on:{click:function(s){t.showRegd=!1}}},[e("div",{staticClass:"panel",on:{click:function(t){t.stopPropagation()}}},[e("div",{staticClass:"title"},[t._v("温馨提示")]),t._v(" "),e("div",{staticClass:"content"},[t._v("\n                                "+t._s(t.submit_res_data.msg)+"\n                        ")]),t._v(" "),e("div",{staticClass:"download-btn",style:"box-shadow:0 .1rem .3rem "+t.$route.meta.bgcolor.start+"99;",on:{click:function(s){return t.download()}}},[t._v("\n                                立即下载\n                        ")])])]):t._e(),t._v(" "),t.show_download?e("div",{staticClass:"dialog",on:{click:function(s){t.show_download=!1}}},[e("div",{staticClass:"panel",on:{click:function(t){t.stopPropagation()}}},[e("div",{staticClass:"title"},[t._v("温馨提示")]),t._v(" "),e("div",{staticClass:"content"},[t._v("\n                                注册成功！正在下载中！\n                        ")])])]):t._e()])},staticRenderFns:[]};var l=e("VU/8")(o,c,!1,function(t){e("ZLGl")},null,null);s.default=l.exports}});
//# sourceMappingURL=3.8ba2aea09bc416f8e024.js.map