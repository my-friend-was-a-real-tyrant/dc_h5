webpackJsonp([3],{"6a8J":function(e,t){},hOGd:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("Fd2+"),n=(a("GKy3"),a("ZMDs")),s={watch:{$route:{handler:function(e,t){window.location.reload()},deep:!0}},data:function(){return{telephone:"",code:"",channelCode:"",wait:0,deviceType:null,downloadUrl:""}},mounted:function(){var e,t,a,i;this.channelCode=this.$route.query.channelCode,this.setDevice(),this.send_data(0),this.get_download_link(),i=void 0,e=""+window.navigator.userAgent.toLowerCase(),t=/MicroMessenger/i.test(e),a=/\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(e),t&&a&&(document.body.addEventListener("focusin",function(){clearTimeout(i)}),document.body.addEventListener("focusout",function(){clearTimeout(i),i=setTimeout(function(){window.scrollTo({top:0,left:0,behavior:"smooth"})},100)}))},methods:{download:function(){window.location.href=this.downloadUrl},send_data:function(e){var t={appType:this.$route.meta.appType,channelCode:this.channelCode,type:e};this.$axios.get("/api/user/traceChannel",{params:t})},setDevice:function(){var e=navigator.userAgent,t=(navigator.appVersion,e.indexOf("Android")>-1||e.indexOf("Linux"),!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/));this.deviceType=t?0:1},get_download_link:function(){var e=this;this.$axios.get("/api/appVersion/getAppVersion",{params:{appType:this.$route.meta.appType,device:this.deviceType}}).then(function(t){if(0==t.code){var a=t.data.replace(new RegExp(/\n/,"gm"),""),s=JSON.parse(n.a.Decrypt(a));console.log(s),e.downloadUrl=s.url||""}else i.a.fail(t.msg)})},handle_submit:function(){var e=this;if(11==this.telephone.length)if(0!=this.code.length){var t={appType:this.$route.meta.appType,telephone:this.telephone,vCode:this.code,uuid:"1",channelCode:this.channelCode,isreg:0};this.$axios.get("/api/user/register",{params:t}).then(function(t){0==t.code?(i.a.success(t.msg),e.send_data(1),e.download()):i.a.fail(t.msg)}).catch(function(e){i.a.fail("网络错误")})}else i.a.fail("请先输入验证码");else i.a.fail("请先输入一个正确的手机号")},start_timing:function(){var e=this,t=null;t=setInterval(function(){0==e.wait?clearInterval(t):e.wait--},1e3)},send_sms:function(){var e=this;if(11==this.telephone.length)if(this.wait>0)i.a.fail("等待"+this.wait+"秒可重新发送");else{var t={appType:this.$route.meta.appType,telephone:this.telephone};this.console("发送验证码",t),i.a.loading({mask:!0,message:"发送中..."}),this.$axios.get("/api/user/sendVcode",{params:t}).then(function(t){i.a.clear(),0==t.code?(i.a.success(t.msg),e.wait=60,e.start_timing()):i.a.fail(t.msg)}).catch(function(e){i.a.clear(),i.a.fail("发送失败，网络错误")})}else i.a.fail("请先输入一个正确的手机号")}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"boss",style:"background: linear-gradient("+e.$route.meta.bgcolor.start+","+e.$route.meta.bgcolor.end+");"},[a("div",{staticClass:"bg"},[a("img",{staticClass:"bg-img",attrs:{src:e.$route.meta.slices.bg,alt:""}})]),e._v(" "),a("div",{staticClass:"main"},[a("div",{staticClass:"panel"},[a("div",{staticClass:"input-box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.telephone,expression:"telephone"}],attrs:{type:"text",placeholder:"请输入手机号"},domProps:{value:e.telephone},on:{input:function(t){t.target.composing||(e.telephone=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input-box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],attrs:{type:"text",placeholder:"请输入验证码"},domProps:{value:e.code},on:{input:function(t){t.target.composing||(e.code=t.target.value)}}}),e._v(" "),a("span",{staticClass:"send-btn",class:e.wait>0?"disabled":"",on:{click:e.send_sms}},[e._v(e._s(e.wait>0?"重新发送（"+e.wait+"秒）":"获取验证码"))])]),e._v(" "),a("div",{staticClass:"submit-btn",on:{click:e.handle_submit}},[a("img",{staticClass:"btn-img",attrs:{src:e.$route.meta.slices.btn,alt:""}}),e._v(" "),a("span",{staticClass:"text"},[e._v("立即拿钱")])])])])])},staticRenderFns:[]};var l=a("VU/8")(s,o,!1,function(e){a("6a8J")},null,null);t.default=l.exports}});
//# sourceMappingURL=3.b2ef70218e3e5a3a614a.js.map