<template>
  <!-- 基本的页面结构 -->
  <el-card v-loading = "loading">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 上传图片 -->
    <el-row type="flex" justify="">
      <el-upload :http-request="uploadImg" :show-file-list="false" action="">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-row>

    <!-- 素材 -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <!-- 全部素材内容  定制（自己写样式）-->
        <div class="img-list">
          <!-- v-for -->
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" type="flex" align="middle" justify="space-around">
              <!-- v-bind:style   根据收藏状态显示图标的颜色-->
              <i @click="collectOrCancel(item)" :style="{color:item.is_collected? 'red':''}" class="el-icon-star-on"></i>
              <i @click="delMaterial(item.id)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <!-- <el-row type="flex" justify="center" style="height:80px" align="middler">
        <el-pagination
          background
          layout="prev,pager,next"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          @current-change="changePage"
        ></el-pagination>
      </el-row> -->

      <el-tab-pane label="素材管理" name="collect">
        <!-- 收藏素材内容 -->
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
        <!-- <el-row type="flex" justify="center" style="height:80px" align="middler">
          <el-pagination
            background
            layout="prev,pager,next"
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            @current-change="changePage"
          ></el-pagination>
        </el-row> -->
      </el-tab-pane>
    </el-tabs>
    <el-row type="flex" justify="center" style="height:80px" align="middler">
          <el-pagination
            background
            layout="prev,pager,next"
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false, // 定义一个变量
      activeName: 'all', // 默认选中全部
      list: [], // 接受全部数据
      page: {
        currentPage: 1, // 当前页码
        pageSize: 12, // 每页多少条
        total: 0 // 总条数
      }
    }
  },
  methods: {
    // 定义一个删除的方法
    delMaterial (id) {
      this.$confirm('你确实要删除该素材吗？').then(() => {
        // 只有点击了确定才执行
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(() => {
          this.getALLMaterial()
        })
      })
    },
    // 图片收藏 或取消
    collectOrCancel (row) {
      // 调用收藏或取消的接口
      this.$axios({
        url: `/user/images/${row.id}`,
        method: 'put',
        data: {
          collect: !row.is_collected // 取反 收藏--取消-false  取消--收藏--true
        }
      }).then(() => {
        // 成功之后一定进入到then 然后在重新加载页面渲染
        this.getALLMaterial()
      })
    },
    // 上传图片
    uploadImg (params) {
      this.loading = true
      let form = new FormData()
      form.append('image', params.file) // 添加文件到formdata
      this.$axios({
        method: 'post',
        url: '/user/images',
        data: form // 要求是formdata 数据类型
      }).then(result => {
        this.loading = false
        this.getALLMaterial()
      })
    },
    // 切换分页
    changePage (newPage) {
      this.page.currentPage = newPage // 得到最新页码
      this.getALLMaterial()
    },
    // 切换tab事件
    changeTab () {
      this.page.currentPage = 1
      this.getALLMaterial()
    },
    // 获取所有素材 /收藏
    getALLMaterial () {
      // all 所有 collect 收藏
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 获取总条数
      })
    }
  },
  created () {
    this.getALLMaterial() // 获取所有素材  第一次进入 activename 为all 实际上是查的全部的数据
  }
}
</script>

<style lang="less" scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-card {
    width: 200px;
    height: 240px;
    margin: 20px 50px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      font-size: 20px;
      width: 100%;
      position: absolute;
      bottom: 0;
      background-color: #f4f5f6;
      height: 30px;
      left: 0;
      i{
        cursor: pointer;
      }
    }
  }
}

/* 基本的页面结构 */
/* <el-card>
      <bread-crumb slot="header">
      <template slot="title">素材管理</template>
      </bread-crumb>
  </el-card> */
</style>
