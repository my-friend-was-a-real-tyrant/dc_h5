<template>
        <div class="boss" :style="'background: linear-gradient('+$route.meta.bgcolor.start+','+$route.meta.bgcolor.end+');'">
                <div class="bg">
                        <img :src="$route.meta.slices.bg" class="bg-img" alt="">
                </div>
                <div class="main">
                        <div class="panel">
                                <div class="input-box">
                                        <input type="text" placeholder="请输入手机号" v-model="telephone">
                                </div>
                                <div class="input-box">
                                        <input type="text" placeholder="请输入验证码" v-model="code">
                                        <span class="send-btn-3" :class="wait>0?'disabled':''" @click="send_sms">{{wait>0?'重新发送（'+wait+'秒）':'获取验证码'}}</span>
                                </div>
                                <div class="submit-btn" @click="handle_submit">
                                        <img class="btn-img" :src="$route.meta.slices.btn" alt="">
                                        <span class="text">立即拿钱</span>
                                </div>
                        </div>
                </div>
        </div>
</template>
<script>
import { Toast } from 'vant';
import 'vant/lib/toast/style'
import Crypt from '@/aes.js';
export default {
        watch:{
                '$route':{
                        handler(n,o) {
                                window.location.reload()
                        },
                        deep:true
                }
        },
        data() {
                return {
                        telephone:'',
                        code:'',
                        channelCode:'',
                        wait:0,
                        deviceType:null,
                        downloadUrl:''
                }
        },
        mounted() {
                this.setDevice()
                this.channelCode = this.$route.query.channelCode || this.$route.query.channelcode
                
                this.send_data(0);//发送PV埋点
                
                var n = document.querySelectorAll('input,textarea');
                Array.prototype.forEach.call(n, function(dom) {        
                var pageDom = 5;
                dom.onblur = function() {
                document.body.scrollTop = ++pageDom;
                };
                });
                this.get_download_link();
        },
        methods:{
                send_data(type) {
                        let data = {
                                appType:this.$route.meta.appType,
                                channelCode:this.channelCode,
                                type:type
                        };
                        this.$axios.get('/api/user/traceChannel',{params:data})
                },
                setDevice() {
                        var u = navigator.userAgent, app = navigator.appVersion;
                        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
                        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                        if(isIOS) {
                                this.deviceType = 0;
                        } else {
                                this.deviceType = 1;
                        }
                },
                get_download_link() {
                        this.$axios.get('/api/appVersion/getAppVersion',{
                                params:{
                                        appType:this.$route.meta.appType,
                                        device:this.deviceType
                                },
                        })
                        .then((res)=>{
                                if(res.code==0) {
                                        console.log((res.data))
                                        console.log(Crypt.Decrypt(res.data));
                                } else {
                                        Toast.fail(res.msg);
                                }
                        })
                },
                handle_submit() {

                        if(this.telephone.length!=11) {
                                Toast.fail('请先输入一个正确的手机号')
                                return;
                        } else if(this.code.length==0) {
                                Toast.fail('请先输入验证码')
                                return
                        }
                        let data = {
                                appType:this.$route.meta.appType,
                                telephone:this.telephone,
                                vCode:this.code,
                                uuid:'1',
                                channelCode:this.channelCode,
                                isreg:0
                        };

                        this.$axios.get('/api/user/register',{params:data})
                        .then((res)=>{
                                if(res.code == 0) {
                                        Toast.success(res.msg)
                                        this.send_data(1);
                                        this.download()
                                } else {
                                        Toast.fail(res.msg);
                                }
                        })
                        .catch((err)=>{
                                Toast.fail('网络错误');
                        })
                },
                start_timing() {
                        var t = null;
                        t = setInterval(()=>{
                                if(this.wait == 0) {
                                        clearInterval(t)
                                } else {
                                        this.wait --;
                                }
                        },1000)
                },
                send_sms() {
                        if(this.telephone.length!=11) {
                                Toast.fail('请先输入一个正确的手机号')
                                return;
                        }
                        if(this.wait>0) {
                                Toast.fail('等待'+this.wait+'秒可重新发送')
                                return
                        }
                        let data  ={
                                appType:this.$route.meta.appType,
                                telephone:this.telephone
                        }
                        this.console('发送验证码',data)
                        Toast.loading({
                                mask: true,
                                message: '发送中...'
                        });
                        this.$axios.get('/api/user/sendVcode',{
                                params:data
                        })
                        .then((res)=>{
                                Toast.clear()
                                if(res.code == 0) {
                                        Toast.success(res.msg)
                                        this.wait = 60;
                                        this.start_timing()
                                } else {
                                        Toast.fail(res.msg)
                                }
                        })
                        .catch((err)=>{
                                Toast.clear()
                                Toast.fail('发送失败，网络错误')
                        })
                }
        }
}
</script>
<style lang="less">
        .boss{
                font-size: .5rem;
                width:100%;
                min-height: 100%;
                height: auto;
                overflow: hidden;
                .bg{
                        position: relative;
                        img.bg-img{
                                width:100%;
                                vertical-align: top;
                        }
                }
                .main{
                        padding:0 .4rem;
                        box-sizing: border-box;
                        margin-top: -0.7rem;
                        width:100%;
                        position: relative;
                        margin-bottom: .4rem;
                        z-index: 9;
                        .panel{
                                width:100%;
                                height:auto;
                                box-sizing: border-box;
                                background-color: #fff;
                                border-radius: .3rem;
                                
                                padding:.4rem 0;
                                .submit-btn{
                                        position: relative;
                                        width:100%;
                                        padding:0 .2rem;
                                        box-sizing: border-box;
                                        .btn-img{
                                                width:100%;
                                        }
                                        .text{
                                                color:#fff;
                                                font-size: .3rem;
                                                position:absolute;
                                                top:0;
                                                left:0;
                                                right:0;
                                                bottom:.35rem;
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                        }
                                }
                                .input-box{
                                        display: flex;
                                        height: 1rem;
                                        background-color: #f8f8f8;
                                        border-radius: 1rem;
                                        margin:0 .4rem;
                                        margin-bottom: .24rem;
                                        padding:0 .4rem;
                                        input{
                                                flex:1;
                                                display: block;
                                                background-color: rgba(0,0,0,0);
                                                outline: none;
                                                font-size: .24rem;
                                                border:0;
                                        }
                                        input::-webkit-input-placeholder{
                                        color:#ccc;
                                        }
                                        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
                                        color:#ccc;
                                        }
                                        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                                        color:#ccc;
                                        }
                                        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
                                        color:#ccc;
                                        }
                                        .send-btn-3{
                                                padding-left: .1rem;
                                                font-size: .24rem;
                                                color:#FF9392;
                                                line-height: 1rem;
                                        }
                                        .send-btn.disabled{
                                                color:#aaa;
                                        }
                                }
                                
                        }
                }
        }
</style>