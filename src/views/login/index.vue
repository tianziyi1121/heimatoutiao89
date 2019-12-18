<template>
  <div class="login">
    <!-- 放置一个卡片组件 -->
    <el-card class="box-card">
      <div>
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单容器  登录表单 -->
      <el-form :model="loginForm" :rules="loginRules" style="margin-top:30px">
        <!-- 表单域 必须写在el-form里面 -->
        <el-form-item prop="mobile">
          <!-- 里面放具体的组件 里面是放element ui的标签 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width:65%" placeholder="请输入验证码"></el-input>
          <el-button   plain style="float:right" >发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">我已经阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 是否勾选，false不勾选
      },
      loginRules: {
        // 验证规则 验证登录表单的
      }
    }
  }
}
</script>

<style lang="less">
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  background-size: cover; //自适应北京图片
  display: flex;
  // justify-content: center;
  // align-items:center

  .box-card {
    margin: auto;
    width: 440px;
    height: 350px;
  }
}
</style>
