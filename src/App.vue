<template>
  <div id="app">
    <router-view class="router-view"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    
  }
}
</script>

<style lang="less">
html,body{
  width:100%;
  height: 100%;
  margin:0;
  position: absolute;
  padding:0;
  *{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  #app{
    width:100%;
    height:100%;
    position: absolute;
    .roter-view{
      width:100%;
    }
  }
}
</style>