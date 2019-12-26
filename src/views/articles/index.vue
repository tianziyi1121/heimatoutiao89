<template>
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>
    <!-- 行 -->
    <el-row class="searchTool">
      <el-col :span="2">
        <span>文章状态</span>
      </el-col>
      <el-col :span="18">
        <!-- 单选框组 -->
        <!-- <el-radio-group @change="changeCondition" v-model="formData.status"> -->
        <el-radio-group @change="changeCondition" v-model="formData.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>频道列表</span>
      </el-col>
      <el-col :span="18">
        <!-- 循环生成多个el-option  label指的是 el-option的显示值 value指的是 el-option的存储值 -->
        <el-select @change="changeCondition" v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>时间选择</span>
      </el-col>
      <el-col :span="18">
        <el-date-picker
          @change="changeCondition"
          value-format="yyyy-MM-dd"
          v-model="formData.dateRange"
          type="daterange"
          range-separator="-"
          start-placeholde="开始时间"
          end-placeholde="结束时间"
        ></el-date-picker>
      </el-col>
    </el-row>
    <!-- 主体 -->
    <el-row class="total">
      <span>共找到{{ page.total }}条符合条件的内容</span>
    </el-row>
    <!-- 循环的模板  el-row 可以随意布局  el-col表示列-->
    <el-row
      v-for="item in list"
      :key="item.id.toString()"
      class="article-item"
      type="flex"
      justify="space-between"
    >
      <!-- 左侧 -->
      <el-col :span="14">
        <el-row type="flex">
          <img :src="item.cover.images.length ?  item.cover.images[0] : defaultImg" alt />
          <div class="info">
            <span>{{ item.title}}</span>
            <!-- 过滤器不仅可以在插值表达式中使用 还可以在v-bind中使用 -->
            <el-tag class="tag" :type="item.status | filtersType">{{ item.status | filterStatus }}</el-tag>
            <span class="date">{{ item.pubdate }}</span>
          </div>
        </el-row>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="6">
        <el-row class="right" type="flex" justify="end">
          <span>
            <i class="el-icon-edit"></i>修改
          </span>
          <span @click="delArticle(item.id)">
            <i class="el-icon-delete"></i>删除
          </span>
        </el-row>
      </el-col>
    </el-row>
    <!-- 分页组件 -->
    <el-row type="flex" justify="center" align="middle" style="height:60px">
      <el-pagination
        @current-change="changePage"
        background
        layout="prev,pager,next"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5,
        channel_id: null, // 默认是空
        dateRange: [] // 初始长度默认为一个空数组 所以在组合条件的时候需要先判断一下 是否为空 若不判断之间传会报错
      },
      channels: [], // 定义一个空数组 接受频道
      list: [], // 接受文章列表数据
      defaultImg: require('../../assets/img/01.jpg'),
      page: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 文章列表 最低每页10条
        total: 0 // 总条数
      }
    }
  },
  // 处理显示状态
  filters: {
    filterStatus (value) {
      // value是过滤器前面表达式计算得到的值
      // 文章状态 0 草稿 1 待审核 2 审核通过 3审核失败 4 已删除
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '审核通过'
        case 3:
          return '审核失败'

        default:
          break
      }
    },
    filtersType (value) {
      // value是过滤器前面表达式计算得到的值
      // 文章状态 0 草稿 1 待审核 2 审核通过 3审核失败 4 已删除
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'

        default:
          break
      }
    }
  },
  // filtersType (value) {
  //   // value是过滤器前面表达式计算得到的值
  //   // 文章状态 0 草稿 1 待审核 2 审核通过 3审核失败 4 已删除
  //   switch (value) {
  //     case 0:
  //       return 'warning'
  //     case 1:
  //       return 'info'
  //     case 2:
  //       return ''
  //     case 3:
  //       return 'danger'

  //     default:
  //       break
  //   }
  // },
  methods: {
    // 删除文章
    delArticle (id) {
      // 已发布的文章不能删除 只有草稿可以删除
      this.$confirm('你确定要删除吗?').then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除文章成功'
          })
          // this.page.currentPage = 1  如果想回第一页就 赋值为1 否则就不用管
          this.getConditionArticles() // 重新调用
        })
      })
    },
    // 改变页码事件
    changePage (newPage) {
      // 赋值当前页码
      this.page.currentPage = newPage
      this.getConditionArticles()
    },
    //   改变条加   为搜索条件添加change事件  当条件改变时触发事件
    // changeCondition () {
    //   // 组装条件
    //   let params = {
    //     status: this.formData.status === 5 ? null : this.formData.status, // 最新状态
    //     channel_id: this.formData.channel_id, // 频道
    //     // begin_pubdate: this.formData.dateRange.length
    //     //   ? this.formData.dateRange[0]
    //     //   : null, // 起始时间
    //     // end_pubdate:
    //     //   this.formData.dateRange.length > 1 ? this.formData.dateRange[1] : null // 截至时间
    //     begin_pubdate: this.formData.dateRange.length ? this.formData.dateRange[0] : null, // 起始时间
    //     end_pubdate: this.formData.dateRange.length > 1 ? this.formData.dateRange[1] : null
    //   }
    //   this.getArticles(params) // 调用获取文章数据
    // },
    // 改变条件
    changeCondition () {
      // 组装条件
      // 最新状态
      this.page.currentPage = 1 // 强制将当前页码回到第一页
      this.getConditionArticles()
    },
    getConditionArticles () { // 该方法里面既有分页数据 也有条件数据
      let params = {
        page: this.page.currentPage, // 分页信息
        per_page: this.page.pageSize, // 分页信息
        status: this.formData.status === 5 ? null : this.formData.status, // 不传为全部 5代表全部
        channel_id: this.formData.channel_id, // 频道
        begin_pubdate: this.formData.dateRange.length ? this.formData.dateRange[0] : null, // 起始时间
        end_pubdate: this.formData.dateRange.length > 1 ? this.formData.dateRange[1] : null // 截止时间
      }
      this.getArticles(params) // 调用获取文章数据
    },
    // 获取文章列表数据
    // getArticles (params) {
    //   this.$axios({
    //     url: '/articles', // 请求地址
    //     params
    //   }).then(result => {
    //     this.list = result.data.results // 接受文章列表数据
    //   })
    // },
    getArticles (params) { // 完成 分页切换/条件切换
      this.$axios({
        url: '/articles', // 请求地址
        // url: '/articles', // 请求地址
        params
      }).then(result => {
        this.list = result.data.results// 接收文章列表数据
        this.page.total = result.data.total_count // 文章总数
      })
    },

    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels() // 调用获取频道数据
    this.getArticles() // 调用获取文章列表
  }
}
</script>

<style lang="less" scoped>
.articles {
  .searchTool {
    height: 60px;
    padding-left: 50px;
  }
  .total {
    margin: 30px 0;
  }
  .article-item {
    margin: 20px 0;
    padding: 10px;
    border-bottom: 1px solid #f2f3f4;
    img {
      width: 180px;
      height: 100px;
      margin-right: 10px;
      border-radius: 4px;
    }
    .info {
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .tag {
        max-width: 72px;
      }
      .date {
        color: #999;
        font-size: 12px;
      }
    }
  }
  .right {
    span {
      margin-left: 10px;
      font-size: 14px;
    }
  }
}
</style>
