webpackJsonp([1],{ekMz:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("mvHQ"),n=a.n(i),s=a("Fd2+"),o=(a("GKy3"),a("ZMDs")),l={watch:{$route:{handler:function(e,t){window.location.reload()},deep:!0}},data:function(){return{telephone:"",code:"",channelCode:"",wait:0,deviceType:null,downloadUrl:""}},mounted:function(){this.channelCode=this.$route.query.channelCode,this.setDevice(),this.send_data(0),this.get_download_link();var e=document.querySelectorAll("input,textarea");Array.prototype.forEach.call(e,function(e){var t=5;e.onblur=function(){document.body.scrollTop=++t}})},methods:{send_data:function(e){var t={appType:this.$route.meta.appType,channelCode:this.channelCode,type:e};this.$axios.get("/api/user/traceChannel",t)},setDevice:function(){var e=navigator.userAgent,t=(navigator.appVersion,e.indexOf("Android")>-1||e.indexOf("Linux"),!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/));this.deviceType=t?0:1},get_download_link:function(){this.$axios.get("/api/appVersion/getAppVersion",{params:{appType:this.$route.meta.appType,device:this.deviceType}}).then(function(e){0==e.code?(console.log(n()(e.data)),console.log(o.a.Decrypt(e.data))):s.a.fail(e.msg)})},handle_submit:function(){var e=this;if(11==this.telephone.length)if(0!=this.code.length){var t={appType:this.$route.meta.appType,telephone:this.telephone,vCode:this.code,uuid:"1",channelCode:this.channelCode,isreg:0};this.$axios.get("/api/user/register",{params:t}).then(function(t){0==t.code?(s.a.success(t.msg),e.send_data(1),e.download()):s.a.fail(t.msg)}).catch(function(e){s.a.fail("网络错误")})}else s.a.fail("请先输入验证码");else s.a.fail("请先输入一个正确的手机号")},start_timing:function(){var e=this,t=null;t=setInterval(function(){0==e.wait?clearInterval(t):e.wait--},1e3)},send_sms:function(){var e=this;if(11==this.telephone.length)if(this.wait>0)s.a.fail("等待"+this.wait+"秒可重新发送");else{var t={appType:this.$route.meta.appType,telephone:this.telephone};this.console("发送验证码",t),s.a.loading({mask:!0,message:"发送中..."}),this.$axios.get("/api/user/sendVcode",{params:t}).then(function(t){s.a.clear(),0==t.code?(s.a.success(t.msg),e.wait=60,e.start_timing()):s.a.fail(t.msg)}).catch(function(e){s.a.clear(),s.a.fail("发送失败，网络错误")})}else s.a.fail("请先输入一个正确的手机号")}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"boss",style:"background: linear-gradient("+e.$route.meta.bgcolor.start+","+e.$route.meta.bgcolor.end+");"},[a("div",{staticClass:"bg"},[a("img",{staticClass:"bg-img",attrs:{src:e.$route.meta.slices.bg,alt:""}})]),e._v(" "),a("div",{staticClass:"main"},[a("div",{staticClass:"panel"},[a("div",{staticClass:"tip"},[e._v("用钱就找来贷吧")]),e._v(" "),a("div",{staticClass:"input-box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.telephone,expression:"telephone"}],attrs:{type:"text",placeholder:"请输入手机号"},domProps:{value:e.telephone},on:{input:function(t){t.target.composing||(e.telephone=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input-box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],attrs:{type:"text",placeholder:"请输入验证码"},domProps:{value:e.code},on:{input:function(t){t.target.composing||(e.code=t.target.value)}}}),e._v(" "),a("span",{staticClass:"send-btn-2",class:e.wait>0?"disabled":"",on:{click:e.send_sms}},[e._v(e._s(e.wait>0?"重新发送（"+e.wait+"秒）":"获取验证码"))])]),e._v(" "),a("div",{staticClass:"submit-btn",on:{click:e.handle_submit}},[a("img",{staticClass:"btn-img",attrs:{src:e.$route.meta.slices.btn,alt:""}}),e._v(" "),a("span",{staticClass:"text"},[e._v("立即拿钱")])])])])])},staticRenderFns:[]};var r=a("VU/8")(l,c,!1,function(e){a("rVuq")},null,null);t.default=r.exports},mvHQ:function(e,t,a){e.exports={default:a("qkKv"),__esModule:!0}},qkKv:function(e,t,a){var i=a("FeBl"),n=i.JSON||(i.JSON={stringify:JSON.stringify});e.exports=function(e){return n.stringify.apply(n,arguments)}},rVuq:function(e,t){}});
//# sourceMappingURL=1.c0e59a1520051065fd02.js.map