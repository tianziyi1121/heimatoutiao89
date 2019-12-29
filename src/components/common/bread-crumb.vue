<template>
<!-- 面包屑的内容 -->
  <el-breadcrumb separator=">">
    <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
    <el-breadcrumb-item >
        <!-- 具名插槽 -->
        <slot name="title"></slot>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {}
</script>

<style>
/* 这个文件是用来放标题的  一级标题 二级标题 */
</style>
