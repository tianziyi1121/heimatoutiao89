<template>
  <div class="login">
  <!-- 放置一个卡片组件 -->
<el-card class="box-card">
  <div  class="text item">

  </div>
</el-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
  .login{
    background-image: url('../../assets/img/login_bg.jpg');
    height: 100vh;
    background-size: cover;//自适应北京图片

    display: flex;
    // justify-content: center;
    // align-items:center
    .box-card{
       margin:  auto;
      width: 440px;
      height: 350px;
    }
  }
</style>
