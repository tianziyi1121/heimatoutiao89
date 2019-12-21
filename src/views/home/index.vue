<template>
  <!-- 先放置一个外层容器 -->
  <el-container>
    <!-- 左右布局 -->
    <el-aside style="background-color:#353b4e;min-height:100vh; width:230px">
      <!-- 放置左侧组件 -->
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧 -->
    <el-container>
      <el-header>

        <layout-header></layout-header>
      </el-header>
      <el-main style="padding:0">
        <!-- 二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import layoutAside from '../../components/home/laylout-aside' // 引入侧边栏
// import layloutHeader from '../../components/home/layout-header'// 引入右侧头部
export default {
  // components: {
  // 'layout-aside': layoutAside, // layout-aside 是上面的标签
  // 'layout-header': layloutHeader
  // 注释的这四行 是因为进行了全局注册 所以不上交
  // }
}
</script>

<style>
</style>
