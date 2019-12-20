<template>
  <!-- 右侧头部 -->
  <el-row class="layout-header" type="flex" justify="space-between" align="middle">
      <!-- 左侧 -->
    <el-col class="left" :span="6">
      <!-- 左侧图标 -->
      <i class="el-icon-s-fold"></i>
      <span class="title">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <!-- 右侧 -->
    <el-col :span="6" class="right">
      <el-row type="flex" justify="end" align="middle">
        <!-- <div style="float:right">  右侧头像 -->
          <img :src="!userInfo.photo? userInfo.photo:defaultImg" class="picture" />
          <el-dropdown @command="handleCommand">
            <span>{{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
            <!-- 下拉菜单 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item command="git">git地址</el-dropdown-item>
              <el-dropdown-item command="lgout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        <!-- </div> -->
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}, // 用户信息
      defaultImg: require('../../assets/img/01.jpg')
    }
  },
  created () {
    let token = window.localStorage.getItem('user-token') // 获取令牌信息
    // 查询数据
    this.$axios({
      url: '/user/profile',
      // 用headers来传headers参数
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(result => {
      this.userInfo = result.data.data // 获取用户的个人信息
    })
  },
  methods: {
    handleCommand (command) {
      // 区分点击的菜单栏
      if (command === 'lgout') {
        //   删除令牌
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/shuiruohanyu/89heimatoutiao'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  height: 60px;
  .left {
    font-size: 16px;
    .title {
      margin-left: 5px;
      color: #2c3e50;
    }
  }
  .right {
    .picture {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
}
</style>
