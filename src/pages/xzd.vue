<template>
  <div class="boss" v-show="status == 1"
       :style="'background: linear-gradient('+$route.meta.bgcolor.start+','+$route.meta.bgcolor.end+');'">
    <div class="bg">
      <img :src="$route.meta.slices.bg" class="bg-img" alt=""/>
    </div>
    <div class="main" style="margin-top: -1rem">
      <div class="panel">
        <div class="input-box-bg" style="margin-top: 0">
          <div class="input-box input-box-bg1">
            <input type="text" placeholder="请输入手机号" v-model="telphone">
          </div>
        </div>
        <div class="input-box-bg">
          <div class="input-box input-box-bg2">
            <input type="text" placeholder="请输入验证码" v-model="code">
            <span class="send-btn" :class="wait>0?'disabled':''"
                  @click="send_sms">{{wait>0?`剩余${wait}s`:waitMsg}}</span>
          </div>
        </div>
        <div class="input-box-bg btn-bg">
          <div class="input-box" style="padding: 0;">
            <div class="submit-btn" @click="handle_submit">
              <span class="text" style="top:0rem;bottom: 0rem">马上借款</span>
            </div>
          </div>
        </div>

        <!--<div class="submit-btn" @click="handle_submit">-->
        <!--<span class="text">马上借款</span>-->
        <!--</div>-->
      </div>
    </div>
    <div class="dialog" v-if="showRegd" @click="showRegd = false">
      <div class="panel" @click.stop>
        <div class="title">温馨提示</div>
        <div class="content">
          {{submit_res_data.msg||""}}
        </div>
        <div @click="download()" class="download-btn"
             :style="'box-shadow:0 .1rem .3rem '+$route.meta.theme+'99;background: '+$route.meta.theme+';'">
          立即下载
        </div>
      </div>
    </div>
    <div class="dialog" v-if="show_download" @click="show_download = false">
      <div class="panel" @click.stop>
        <div class="title">温馨提示</div>
        <div class="content">
          正在下载中，下载完成后请手动安装。
        </div>
      </div>
    </div>
    <div class="download-page" v-if="download_page">
      <img class="logo" :src="$route.meta.slices.logo" alt="">
      <div class="title">
        <div class="platform">
          <img :src="deviceType==1?'/static/slices/android.png':'/static/slices/ios.png'" alt="" class="">
        </div>
        <span>{{$route.meta.title}}</span>
        <div class="version" :style="'background-color:'+$route.meta.theme">
          企业版
        </div>
      </div>
      <div class="desc" v-if="ress!=null">
        <span>{{ress.str1}}</span><span>{{ress.str2}}</span>
        <br/>
        {{ress.str3}}
      </div>
      <div class="sub-mit-btn" @click="download()">
        <div class="text">
          点击安装
        </div>
        <img :src="$route.meta.slices.btn" alt="">
      </div>
      <div class="sub">
        适用于苹果和安卓手机
      </div>
    </div>
    <van-popup v-model="show" class="popup" round
               :overlay-style="{background: 'rgba(0, 0, 0, 0.2)'}">
      <p class="popup-p1">温馨提示</p>
      <p class="popup-p1">{{showMsg}}</p>
    </van-popup>
  </div>
</template>
<script>
  import {Toast} from 'vant';
  import 'vant/lib/toast/style'
  import md5 from 'js-md5';

  export default {
    data() {
      return {
        telphone: '',
        code: '',
        wait: 0,
        deviceType: null,//设备类型，1=安卓；2=ios
        downurl: '',
        downurl1: '',
        status: 0,
        showRegd: false,
        submit_res_data: null,
        show_download: false,
        download_page: false,
        ress: null,
        show: false,
        showMsg: '',
        waitMsg: '获取验证码'
      }
    },
    mounted() {
      this.set_device();
      this.send_BP(1);//发送埋点
      //
      this.listens();
    },
    methods: {
      start_wait() {
        this.wait = 60;
        var t = null;

        t = setInterval(() => {
          if (this.wait > 0) {
            this.wait--
          } else {
            clearInterval(t);
          }
        }, 1000)
      },
      show_success() {

      },
      //
      send_sms() {
        //this.handle_submit()
        //return;

        if (this.wait > 0) {
          Toast.fail(this.wait + '秒后可重新发送')
        } else {
          this.$axios.post('http://dev.api.haoxianghuaqian.com/send.code?platform=3', {
            main_channel: this.$route.meta.appType,
            t: this.$get_time(),
            app_version: '1.0',
            push_str: this.$route.query.push_str ? this.$route.query.push_str : '',
            phone: this.telphone,
            type: 1
          })
            .then((res) => {
              debugger
              //console.log(res);
              if (res.code == 200) {
                this.start_wait();
                this.waitMsg = '重新发送';
                this.wait = 60;
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
              myFunction = setTimeout(function () {
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
              }, 100)
            })
          }
        })()

        function isWeiXinAndIos() {
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
        if (isIOS) {
          this.deviceType = 2;
        } else {
          this.deviceType = 1;
        }
      },
      download() {
        console.log('download')
        this.send_BP(2);
        this.show_download = true;
        this.showRegd = false;
        if ('' != this.downurl) {
          window.location.href = this.downurl;
        }
        setTimeout(() => {
          if ('' != this.downurl1) {
            window.location.href = this.downurl1;
          }
        }, 1000)
      },
      handle_submit() {
        if (this.telphone.length === 0) {
          Toast.fail("请填写正确手机号")
          return
        }
        if (this.code.length < 4) {
          Toast.fail("请填写有效验证码")
          return
        }

        this.$axios.post('http://dev.api.haoxianghuaqian.com/login?platform=3', {
          main_channel: this.$route.meta.appType,
          t: this.$get_time(),
          app_version: '1.0',
          push_str: this.$route.query.push_str ? this.$route.query.push_str : '',

          phone: this.telphone,
          code: this.code,
        })
          .then((res) => {
            //console.log(res)
            if (res.code == 200) {
              this.submit_res_data = res.data;
              this.download_page = true;
              // if(res.data.is_new==0) {
              //         this.showRegd = true;
              // }
              this.show = true
              this.showMsg = res.msg
            } else {
              Toast.fail(res.msg);
            }
          })
          .catch((error) => {
            //console.log(error)
          })
        setTimeout(() => {
          this.show = false
        }, 2000)
      },
      //发送埋点，1=页面进入，2=点击下载
      send_BP(type) {
        this.$axios.post('http://dev.api.haoxianghuaqian.com/h5?platform=3', {
          //公共参数
          main_channel: this.$route.meta.appType,
          t: this.$get_time(),
          app_version: '1.0',
          push_str: this.$route.query.push_str ? this.$route.query.push_str : '',

          //业务参数
          type: type,
          pingtai: this.deviceType,
          uniq: this.uniq(),
        })
          .then((res) => {
            this.status = res.data.status;
            if (res.code == 200 && 'downurl' in res.data) {
              this.downurl = res.data.downurl;
              this.downurl1 = res.data.downurl1;
              this.ress = res.data;
            }
            //alert(this.downurl)
          })
      },
      uniq() {
        //return 1;
        if (localStorage.getItem('uniq')) {
          return localStorage.getItem('uniq');
        } else {
          localStorage.setItem('uniq', md5(Math.random().toString()));
          return localStorage.getItem('uniq');
        }
      }
    },

  }
</script>
<style lang="less" scoped>
  .boss {
    font-size: .5rem;
    width: 100%;
    min-height: 100%;
    height: auto;
    overflow: hidden;

    .main {
      padding: 0 .4rem;
      box-sizing: border-box;
      margin-top: -3.5rem;
      width: 100%;
      position: relative;
      margin-bottom: .4rem;
      z-index: 9;

      .top {
        position: relative;
        width: 3.9rem;
        height: 0.51rem;
        background: rgba(78, 243, 246, 1);
        border-radius: 2rem;
        margin: .5rem auto;

        p {
          font-size: 0.28rem;
          font-weight: bold;
          color: rgba(0, 134, 136, 1);
          text-align: center;
          height: 0.05rem;
          line-height: 0.5rem;
        }

      }

      .panel {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: .1rem;
        padding: .4rem 0;

        .tabs {
          border-bottom: 1px solid #E7E7E7;
          height: auto;
          /*width: 100%;*/
          display: flex;
          margin-bottom: .3rem;
          padding: 0 .8rem .3rem .8rem;
          flex-direction: row;
          justify-content: space-between;

          &-img {
          }

          &-p {
            width: 1.3rem;
            height: 0.21rem;
            font-size: 0.22rem;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 0.22rem;
            margin: 0;
            padding: 0;
          }

          div {
            width: 1rem;
            height: 1.2rem;
          }
        }

        .submit-btn {
          position: relative;
          width: 100%;
          /*padding: 0 .2rem;*/
          box-sizing: border-box;
          /*width: 5.6rem;*/
          height: 0.98rem;
          line-height: 0.98rem;
          background: rgba(125, 162, 237, 1);
          border-radius: 0.1rem;

          margin: 0 auto;
          /*margin: 0 0.4rem;*/

          .btn-img {
            width: 100%;
          }

          .text {
            color: #fff;
            font-size: .3rem;
            position: absolute;
            line-height: 0.98rem;
            /*top: 0;*/
            left: 0;
            right: 0;
            /*bottom: .35rem;*/
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .input-box-bg {
          background-color: #f8f8f8;
          height: 1rem;
          border-radius: 0.1rem;
          margin: 0.25rem .4rem;
          .input-box-bg1{
            background: url("../../static/slices/xzd_user.png") no-repeat center left;
          }
          .input-box-bg2{
            padding-left: 0.3rem;
            background: url("../../static/slices/xzd_lock.png") no-repeat center left;
          }
          .input-box {
            display: flex;
            height: 1rem;
            /*border-radius: 1rem;*/
            margin: 0 .4rem;
            margin-bottom: .24rem;
            padding: 0 0 0 0.4rem;

            background-size: 0.26rem 0.3rem;

            input {
              flex: 1;
              display: block;
              background-color: rgba(0, 0, 0, 0);
              outline: none;
              font-size: .25rem;
              border: 0;
              flex-shrink: 0;
              width: 2rem;
              /*height: 1rem;*/
              /*line-height: 1rem;*/
            }

            input::-webkit-input-placeholder {
              color: #ccc;
            }

            input::-moz-placeholder { /* Mozilla Firefox 19+ */
              color: #ccc;
            }

            input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
              color: #ccc;
            }

            input:-ms-input-placeholder { /* Internet Explorer 10-11 */
              color: #ccc;
            }

            .send-btn {
              padding-left: .1rem;
              font-size: .24rem;
              color: #4781D8;
              line-height: 1rem;
            }

            .send-btn.disabled {
              color: #aaa;
            }
          }
        }
        .btn-bg{
          background-color:transparent;
          /*height: 1rem;*/
          /*border-radius: 1rem;*/
          margin: 0;
        }

        .foot {
          text-align: center;
          margin: -0.2rem 0;
        }
      }
    }

    .download-page {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: fixed;
      z-index: 999;
      background-color: #FAFAFA;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      text-align: center;
      box-sizing: border-box;
      padding: 1rem;

      .logo {
        width: 2rem;
      }

      .title {
        font-size: .4rem;
        color: #333;
        position: relative;

        > span {
          min-width: 1.7rem;
          font-weight: 400;
        }

        .platform,
        .version {
          vertical-align: top;
          box-sizing: border-box;
          border-radius: .05rem;
          width: 1rem;
          padding: .03rem .1rem;
          color: #fff;
          display: inline-block;
          font-size: .2rem;

          img {
            vertical-align: middle;
            width: .35rem;
          }
        }

        .version {
          vertical-align: middle;
          text-align: center;
        }

        .platform {
          text-align: right;
        }
      }

      .desc {
        padding-top: .5rem;
        font-size: .24rem;
        line-height: 1.8;
        font-weight: normal;
        color: #000;

        > span {
          margin: 0 .1rem;
        }
      }

      .sub {
        font-size: .24rem;
      }

      .sub-mit-btn {
        margin-top: .4rem;
        width: 100%;
        position: relative;

        img {
          width: 100%;
        }

        .text {
          position: absolute;
          height: 1rem;
          font-size: .28rem;
          color: #fff;
          text-align: center;
          width: 100%;
          line-height: 1rem;
        }
      }
    }

    .dialog {
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: 9999;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;

      .panel {
        position: relative;
        width: 70%;
        padding: .4rem .2rem;
        background-color: #fff;
        border-radius: .3rem;
        margin: 0 auto;

        .title {
          text-align: center;
          font-size: .3rem;
          color: #333;
        }

        .content {
          text-align: center;
          font-size: .28rem;
          padding: .3rem 0;
          padding-bottom: .5rem;
        }

        > .download-btn {
          width: 80%;
          height: .9rem;
          line-height: .9rem;
          text-align: center;
          color: #fff;
          font-size: .3rem;
          margin: 0 auto;
          border-radius: .9rem;
        }


      }
    }

    .bg {
      position: relative;

      img.bg-img {
        width: 100%;
        vertical-align: top;
      }
    }

    .popup {
      padding: .3rem;
      width: 5rem;
      min-height: auto;

      &-p1 {
        height: 0.3rem;
        font-size: 0.32rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 0.22rem;
        text-align: center;
      }
    }
  }
</style>
