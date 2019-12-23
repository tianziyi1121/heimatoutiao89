<template>
  <!-- 卡片组件 -->
  <el-card>
    <!-- 面包屑给了卡片的具名插槽 -->
    <bread-crumb slot="header">
      <!-- 插槽内容 -->
      <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- body内容 -->
    <el-table :data="list">
      <!-- 列组件 -->
      <el-table-column prop="title" width="600" label="标题"></el-table-column>
      <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <!-- {{obj.row.comment_status}}  放组件 作用域插槽 -->
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small">{{obj.row.comment_status ?'关闭评论':'打开评论'}}</el-button>
        </template>
      </el-table-column>childen
    </el-table>
  </el-card>
</template>

<script>
// import { listeners } from 'cluster'
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    //   请求评论列表数据
    getComment () {
      // $axios默认 就是get请求 query 查询参数也叫get参数 也叫url参数 也叫地址参数 其实都是拼接在地址后面的参数
      // body 参数给data 身份信息给headers  因为之前写作hesaders 所以不用写
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        this.list = result.data.results // 获取评论列表数据给本身的data
      })
    },
    formatterBool (row, column, cellVaule, idnex) {
      // row 当前行数据
      // column 当前列属性
      // cellValue 当前单元格的值
      // index 当前的下标
      return cellVaule ? '正常' : '关闭'
    }
  },
  created () {
    //   调用请求数据方法
    this.getComment()
  }
}
</script>

<style>
</style>
