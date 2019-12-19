<template>
  <div class="login">
    <!-- 放置一个卡片组件 -->
    <el-card class="box-card">
      <div>
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单容器  登录表单 -->
      <el-form ref="myForm" :model="loginForm" :rules="loginRules" style="margin-top:30px">
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
          <el-button @click="submitLogin" type="primary" style="width:100%">登录</el-button>
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
        // 验证规则 验证登录表单的 key(字段名):value(数组)数组里面放对象
        mobile: [{
          required: true, message: '请输入你的手机号' }, // required要求必填,不能为空
        { pettern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }], // 用正则表达式来要求输入手机号的规则 若不正确,给出提示信息
        code: [{ required: true, message: '请输入验证码' }, {
          pettern: /^\d{6}$/, message: '验证格式不正确'
        }],
        check: [{ validator: function (rule, value, callback) {
          // rule指当前的规则,没什么用
          // value 指要校验的字段的值,
          // callback 指校验成功或者失败后要执行的回调函数
          if (value) {
            // 校验通过  直接执行callback回调函数
            callback()
          } else {
            // 校验不通过 要提示信息
            callback(new Error('出错了,你必须同意'))
          }
        } }]

      }
    }
  },
  methods: {
    submitLogin () {
      this.$refs.myForm.validate((isOK) => {
        // 前端校验成功
        // 这种写法里面又俩种参数，get类型（查询参数） 参数放在 params对象 中
        // post 类型（body参数）参数放在 data对象里
        this.$axios({
          url: 'authorizations', // 请求地址
          method: 'post', // 请求类型
          data: this.loginForm
        }).then(result => {
          // 成功之后进入到then 然后在前端保存令牌
          window.localStorage.setItem('user-token', result.data.data.token) // 前端缓存令牌
          this.$router.push('/') // 登录成功 跳转到主页
        }).catch(() => {
          // 如果登录失败提醒用户手机号或验证码错误
          // $message是element ui的方法 和vue没有关系
          this.$message({
            message: '你的手机号或者验证码不正确',
            type: 'warning'
          })
        }

        )
      })
    }
  }
}
</script>

<style lang="less">
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  background-size: cover; //自适应背景图片
  display: flex;
  justify-content: center;
  align-items:center;

  .box-card {
    // margin: auto;
    width: 440px;
    height: 350px;
  }
}
</style>
