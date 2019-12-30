<template>
  <el-card v-loading="loading">
      <bread-crumb slot="header">
        <template slot="title">账户信息</template>
      </bread-crumb>
      <!-- 放置上传组件 -->
      <el-upload :http-request="uploadImg"   class="head-upload" action="" :show-file-list="false">
        <img :src="formData.photo ? formData.photo :defaultImg" alt="">
      </el-upload>
      <!-- 放置组件 -->
      <el-form ref="myForm" :model="formData" :rules="userRules" style="margin-left:100px" label-width="100px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formData.name" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="intro">
          <el-input v-model="formData.intro"  style="width:30%"></el-input>
        </el-form-item>
        <el-form-item  label="邮箱" prop="email">
          <el-input v-model="formData.email" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item  label="手机号" disabled>
          <el-input v-model="formData.mobile" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveUserInfo">保存信息</el-button>
        </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: ''// 手机号
      },
      // 定义校验规则
      userRules: {
        name: [{ required: true, message: '用户名不能为空' }, {
          min: 1,
          max: 7,
          message: '用户名的长度限制为1-7个字符'
        }],
        email: [{ required: true, message: '邮箱不能为空' }, {
          pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
          message: '邮箱格式不正确'
        }]
      },
      defaultImg: require('../../assets/img/01.jpg')
    }
  },
  methods: {
    // 上传头像
    uploadImg (params) {
      this.loading = true // 打开弹层
      let data = new FormData() // 实例化对象
      data.append('photo', params.file) // 加入参数
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data: ''
      }).then(result => {
        this.formData.photo = result.data.url // 设置头像地址
        this.loading = false // 关闭弹层
      })
    },
    // 保存用户信息
    saveUserInfo () {
      // 先校验数据是否ok
      this.$refs.myForm.validate((isOk) => {
        // 编辑用户资料  调用保存方法
        if (isOk) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(result => {
            // 认为保存成功
            this.$message({
              type: 'success',
              message: '保存信息成功'
            })
          })
        }
      })
    },
    // 获取用户信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo() // 用户个人信息
  }
}
</script>

<style lang="less" scoped>
  .head-upload{
    position: absolute;
    right: 300px;
    img{
      width: 200px;
      height: 200px;
      border-radius: 50%;
    }
  }
</style>
