webpackJsonp([2],{"4oDr":function(t,s){},ekMz:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("Fd2+"),i=(e("GKy3"),e("NC6I")),n=e.n(i),o={data:function(){return{telphone:"",code:"",wait:0,deviceType:null,downurl:"",downurl1:"",status:0,showRegd:!1,submit_res_data:null,show_download:!1,download_page:!1,ress:null}},mounted:function(){this.set_device(),this.send_BP(1),this.listens()},methods:{start_wait:function(){var t=this;this.wait=60;var s=null;s=setInterval(function(){t.wait>0?t.wait--:clearInterval(s)},1e3)},show_success:function(){},send_sms:function(){var t=this;this.wait>0?a.a.fail(this.wait+"秒后可重新发送"):this.$axios.post("https://api.haoxianghuaqian.com/send.code?platform=3",{main_channel:this.$route.meta.appType,t:this.$get_time(),app_version:"1.0",push_str:this.$route.query.push_str?this.$route.query.push_str:"",phone:this.telphone,type:1}).then(function(s){200==s.code?(t.start_wait(),a.a.success(s.msg)):a.a.fail(s.msg)})},listens:function(){var t,s,e,a;a=void 0,t=""+window.navigator.userAgent.toLowerCase(),s=/MicroMessenger/i.test(t),e=/\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(t),s&&e&&(document.body.addEventListener("focusin",function(){clearTimeout(a)}),document.body.addEventListener("focusout",function(){clearTimeout(a),a=setTimeout(function(){window.scrollTo({top:0,left:0,behavior:"smooth"})},100)}))},set_device:function(){var t=navigator.userAgent,s=(navigator.appVersion,t.indexOf("Android")>-1||t.indexOf("Linux"),!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/));this.deviceType=s?2:1},download:function(){var t=this;console.log("download"),this.send_BP(2),this.show_download=!0,this.showRegd=!1,""!=this.downurl&&(window.location.href=this.downurl),setTimeout(function(){""!=t.downurl1&&(window.location.href=t.downurl1)},1e3)},handle_submit:function(){var t=this;this.$axios.post("https://api.haoxianghuaqian.com/login?platform=3",{main_channel:this.$route.meta.appType,t:this.$get_time(),app_version:"1.0",push_str:this.$route.query.push_str?this.$route.query.push_str:"",phone:this.telphone,code:this.code}).then(function(s){200==s.code?(t.submit_res_data=s.data,t.download_page=!0,a.a.success(s.msg)):a.a.fail(s.msg)}).catch(function(t){})},send_BP:function(t){var s=this,e={main_channel:this.$route.meta.appType,t:this.$get_time(),app_version:"1.0",push_str:this.$route.query.push_str?this.$route.query.push_str:"",type:t,pingtai:this.deviceType,uniq:this.uniq()};console.log("Req:",e),this.$axios.post("https://api.haoxianghuaqian.com/h5?platform=3",e).then(function(t){console.log(t),s.status=t.data.status,200==t.code&&"downurl"in t.data&&(s.downurl=t.data.downurl,s.downurl1=t.data.downurl1,s.ress=t.data)})},uniq:function(){return localStorage.getItem("uniq")?localStorage.getItem("uniq"):(localStorage.setItem("uniq",n()(Math.random().toString())),localStorage.getItem("uniq"))}}},l={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{directives:[{name:"show",rawName:"v-show",value:1==t.status,expression:"status == 1"}],staticClass:"boss",style:"background: linear-gradient("+t.$route.meta.bgcolor.start+","+t.$route.meta.bgcolor.end+");"},[e("div",{staticClass:"bg"},[e("img",{staticClass:"bg-img",attrs:{src:t.$route.meta.slices.bg,alt:""}})]),t._v(" "),e("div",{staticClass:"main"},[e("div",{staticClass:"panel"},[e("div",{staticClass:"tip"},[t._v("用钱就找来贷吧")]),t._v(" "),e("div",{staticClass:"input-box"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.telphone,expression:"telphone"}],attrs:{type:"text",placeholder:"请输入手机号"},domProps:{value:t.telphone},on:{input:function(s){s.target.composing||(t.telphone=s.target.value)}}})]),t._v(" "),e("div",{staticClass:"input-box"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],attrs:{type:"text",placeholder:"请输入验证码"},domProps:{value:t.code},on:{input:function(s){s.target.composing||(t.code=s.target.value)}}}),t._v(" "),e("span",{staticClass:"send-btn",class:t.wait>0?"disabled":"",on:{click:t.send_sms}},[t._v(t._s(t.wait>0?"重新发送（"+t.wait+"秒）":"获取验证码"))])]),t._v(" "),e("div",{staticClass:"submit-btn",on:{click:t.handle_submit}},[e("img",{staticClass:"btn-img",attrs:{src:t.$route.meta.slices.btn,alt:""}}),t._v(" "),e("span",{staticClass:"text"},[t._v("立即拿钱")])])])]),t._v(" "),t.showRegd?e("div",{staticClass:"dialog",on:{click:function(s){t.showRegd=!1}}},[e("div",{staticClass:"panel",on:{click:function(t){t.stopPropagation()}}},[e("div",{staticClass:"title"},[t._v("温馨提示")]),t._v(" "),e("div",{staticClass:"content"},[t._v("\n                                "+t._s(t.submit_res_data.msg)+"\n                        ")]),t._v(" "),e("div",{staticClass:"download-btn",style:"box-shadow:0 .1rem .3rem "+t.$route.meta.theme+"99;background: linear-gradient(to right,"+t.$route.meta.theme+","+t.$route.meta.theme+");",on:{click:function(s){return t.download()}}},[t._v("\n                                立即下载\n                        ")])])]):t._e(),t._v(" "),t.show_download?e("div",{staticClass:"dialog",on:{click:function(s){t.show_download=!1}}},[e("div",{staticClass:"panel",on:{click:function(t){t.stopPropagation()}}},[e("div",{staticClass:"title"},[t._v("温馨提示")]),t._v(" "),e("div",{staticClass:"content"},[t._v("\n                                正在下载中，下载完成后请手动安装。\n                        ")])])]):t._e(),t._v(" "),t.download_page?e("div",{staticClass:"download-page"},[e("img",{staticClass:"logo",attrs:{src:t.$route.meta.slices.logo,alt:""}}),t._v(" "),e("div",{staticClass:"title"},[e("div",{staticClass:"platform"},[e("img",{attrs:{src:1==t.deviceType?"/static/slices/android.png":"/static/slices/ios.png",alt:""}})]),t._v(" "),e("span",[t._v(t._s(t.$route.meta.title))]),t._v(" "),e("div",{staticClass:"version",style:"background-color:"+t.$route.meta.theme},[t._v("\n                                企业版\n                        ")])]),t._v(" "),null!=t.ress?e("div",{staticClass:"desc"},[e("span",[t._v(t._s(t.ress.str1))]),t._v(" "),e("span",[t._v(t._s(t.ress.str2))]),t._v(" "),e("br"),t._v("\n                                "+t._s(t.ress.str3)+"\n                        ")]):t._e(),t._v(" "),e("div",{staticClass:"sub-mit-btn",on:{click:function(s){return t.download()}}},[e("div",{staticClass:"text"},[t._v("\n                                        点击安装\n                                ")]),t._v(" "),e("img",{attrs:{src:t.$route.meta.slices.btn,alt:""}})]),t._v(" "),e("div",{staticClass:"sub"},[t._v("\n                                适用于苹果和安卓手机\n                        ")])]):t._e()])},staticRenderFns:[]};var r=e("VU/8")(o,l,!1,function(t){e("4oDr")},null,null);s.default=r.exports}});
//# sourceMappingURL=2.2cd1e246b3df44de2091.js.map