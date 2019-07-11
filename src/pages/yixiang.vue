<template>
        <div class="boss" v-show="status == 1" :style="'background: linear-gradient('+$route.meta.bgcolor.start+','+$route.meta.bgcolor.end+');'">
                <div class="bg">
                        <img :src="$route.meta.slices.bg" class="bg-img" alt="">
                </div>
                <div class="main">
                        <div class="panel">
                                <div class="input-box">
                                        <input type="text" placeholder="请输入手机号" v-model="telphone">
                                </div>
                                <div class="input-box">
                                        <input type="text" placeholder="请输入验证码" v-model="code">
                                        <span class="send-btn" :class="wait>0?'disabled':''" @click="send_sms">{{wait>0?'重新发送（'+wait+'秒）':'获取验证码'}}</span>
                                </div>
                                <div class="submit-btn" @click="handle_submit">
                                        <img class="btn-img" :src="$route.meta.slices.btn" alt="">
                                        <span class="text">立即拿钱</span>
                                </div>
                                
                        </div>
                </div>
                <div class="dialog" v-if="showRegd" @click="showRegd = false">
                        <div class="panel" @click.stop>
                                <div class="title">温馨提示</div>
                                <div class="content">
                                        {{submit_res_data.msg}}
                                </div>
                                <div @click="download()" class="download-btn" :style="'box-shadow:0 .1rem .3rem #fc675c99;background: linear-gradient(to right,#fc675c,#fd9b82);'">
                                        立即下载
                                </div>
                        </div>
                </div>
                <div class="dialog" v-if="show_download" @click="show_download = false">
                        <div class="panel" @click.stop>
                                <div class="title">温馨提示</div>
                                <div class="content">
                                        注册成功！正在下载中！
                                </div>
                        </div>
                </div>
        </div>
</template>
<script>
import { Toast } from 'vant';
import 'vant/lib/toast/style'
import md5 from 'js-md5';
export default {
        data() {
                return {
                        telphone:'',
                        code:'',
                        wait:0,
                        deviceType:null,//设备类型，1=安卓；2=ios
                        downurl:'',
                        status:0,
                        showRegd:false,
                        submit_res_data:null,
                        show_download:false,
                }
        },
        mounted() {
                this.set_device();
                this.send_BP(1);//发送埋点

                //
                this.listens();
        },
        methods:{
                start_wait() {
                        this.wait = 60;
                        var t = null;

                        t = setInterval(()=>{
                                if(this.wait>0) {
                                        this.wait --
                                } else {
                                        clearInterval(t);
                                }
                        },1000)
                },
                show_success() {

                },
                //
                send_sms() {
                        this.handle_submit()
                        return;

                        if(this.wait>0) {
                                Toast.fail(this.wait+'秒后可重新发送')
                        } else {
                                this.$axios.post('https://api.haoxianghuaqian.com/send.code?platform=3',{
                                        main_channel:this.$route.meta.appType,
                                        t:this.$get_time(),
                                        app_version:'1.0',
                                        push_str:this.$route.query.push_str ? this.$route.query.push_str : '',

                                        phone:this.telphone,
                                        type:1
                                })
                                .then((res)=>{
                                        //console.log(res);
                                        if(res.code == 200) {
                                                this.start_wait();
                                                Toast.success(res.msg);
                                        } else {
                                                Toast.fail(res.msg);
                                        }
                                })
                        }
                },
                //修复微信Bug
                listens() {
                        (function () {
                        let myFunction
                        let isWXAndIos = isWeiXinAndIos()
                        if (isWXAndIos) {
                        document.body.addEventListener('focusin', () => {
                        clearTimeout(myFunction)
                        })
                        document.body.addEventListener('focusout', () => {
                        clearTimeout(myFunction)
                        myFunction = setTimeout(function() {
                                window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
                        }, 100)
                        })
                        }
                        })()

                        function isWeiXinAndIos () {
                        let ua = '' + window.navigator.userAgent.toLowerCase()
                        let isWeixin = /MicroMessenger/i.test(ua)
                        let isIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(ua)
                        return isWeixin && isIos
                        }
                },
                //判断设备
                set_device() {
                        var u = navigator.userAgent, app = navigator.appVersion;
                        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
                        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                        if(isIOS) {
                                this.deviceType = 2;
                        } else {
                                this.deviceType = 1;
                        }
                },
                download() {
                        this.show_download = true;
                        this.showRegd = false;
                        window.location.href = this.downurl;
                },
                handle_submit() {
                        this.$axios.post('https://api.haoxianghuaqian.com/login?platform=3',{
                                main_channel:this.$route.meta.appType,
                                t:this.$get_time(),
                                app_version:'1.0',
                                push_str:this.$route.query.push_str ? this.$route.query.push_str : '',

                                phone:this.telphone,
                                code:this.code,
                        })
                        .then((res)=>{
                                //console.log(res)
                                if(res.code == 200) {
                                        this.send_BP(2);
                                        if(res.data.is_new == 0) {
                                                this.submit_res_data = res.data;
                                                this.showRegd = true;
                                        } else {
                                                Toast.success(res.msg);
                                                this.download();
                                        }
                                } else {
                                        Toast.fail(res.msg);
                                }
                        })
                        .catch((error)=>{
                                //console.log(error)
                        })
                },
                //发送埋点，1=页面进入，2=点击下载
                send_BP(type) {
                        this.$axios.post('https://api.haoxianghuaqian.com/h5?platform=3',{
                                //公共参数
                                main_channel:this.$route.meta.appType,
                                t:this.$get_time(),
                                app_version:'1.0',
                                push_str:this.$route.query.push_str ? this.$route.query.push_str : '',

                                //业务参数
                                type:type,
                                pingtai:this.deviceType,
                                uniq:this.uniq(),
                        })
                        .then((res)=>{
                                //console.log(res);
                                this.status = res.data.status;
                                if(res.code == 200 && 'downurl' in res.data) {
                                        this.downurl = res.data.downurl;
                                        
                                }
                                //alert(this.downurl)
                        })
                },
                uniq() {
                        //return 1;
                        if(localStorage.getItem('uniq')) {
                                return localStorage.getItem('uniq');
                        } else {
                                localStorage.setItem('uniq',md5(Math.random().toString()));
                                return localStorage.getItem('uniq');
                        }
                }
        },
        
}
</script>
<style lang="less">
        .boss{
                font-size: .5rem;
                width:100%;
                min-height: 100%;
                height: auto;
                overflow: hidden;
                .dialog{
                        width:100%;
                        height:100%;
                        position: fixed;
                        z-index: 99999999;
                        top:0;
                        left:0;
                        right:0;
                        bottom:0;
                        background-color: rgba(0,0,0,0.2);
                        display: flex;
                        align-items: center;
                        .panel{
                                position: relative;
                                width:70%;
                                padding:.4rem .2rem;
                                background-color: #fff;
                                border-radius: .3rem;
                                margin:0 auto;
                                .title{
                                        text-align: center;
                                        font-size: .3rem;
                                        color:#333;
                                }
                                .content{
                                        text-align: center;
                                        font-size: .28rem;
                                        padding: .3rem 0;
                                        padding-bottom: .5rem;
                                }
                                >.download-btn{
                                        width: 80%;
                                        height: .9rem;
                                        line-height: .9rem;
                                        text-align: center;
                                        color:#fff;
                                        font-size: .3rem;
                                        margin: 0 auto;
                                        border-radius: .9rem;
                                }
                        }
                }
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
                                border-radius: .1rem;
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
                                        .send-btn{
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