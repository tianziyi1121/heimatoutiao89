<template>
<!-- 自己的 -->
  <el-tabs v-model="activeName">
      <el-tab-pane label="素材库" name="material">
        <div class="select-img-list">
          <!-- 循环生成选择列表 -->
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <!-- 点击图片时调用方法 将图片地址传出去 -->
            <img @click="clickImg(item.url)" :srcm="item.url" alt="">
          </el-card>
        </div>
        <!-- 放置一个分页组件 -->
        <el-row type="flex" justify="center">
          <el-pagination background layout="prev,pager,next"
            :total="page.total"
            :current-page="page.currenPage"
            :page-size="page.pageSize"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传图片" name="upload">
        <!-- 放置一个上传组件 -->
        <el-upload class="upload" :http-request="uploadImg" action="" :show-file-list="false">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 默认选择素材库
      list: [], // 接受素材数据
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    // 上传
    uploadImg (params) {
      let data = new FormData() // 实例化对象
      data.append('image', params.file) // 添加文件参数4
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        // result.data.url
        this.$emit('selectOneImg', result.data.url) // 自定义事件名这里不再强制小写
      })
    },
    // 点击图片触发
    clickImg (url) {
      // 需要将url地址传出去 $emit 自定义事件 => 携带参数
      this.$emit('selectOneImg', url) // 自定义事件名这里不需要强制 小写
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    //  获取所有的素材
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false, // 获取全部数据
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        // console.log(result.data.results)
        this.page.total = result.data.total_count // 赋值总数
      })
    }
  },
  created () {
    this.getAllImg() // 获取所有素材
  }
}
</script>

<style lang="less" scoped>
  .select-img-list {
  display: flex;
  flex-wrap: wrap;
  display: inline-block;
  justify-content: center;
  .img-card {
    display: inline-block;
    width: 120px;
    height: 120px;
    margin: 10px 25px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.upload {
   display: flex;
   justify-content: center;
    i {
        font-size: 50px;
        display: block;
        margin: 20px auto;
        padding: 60px;
        border: 1px dashed #ccc;
        border-radius: 4px;
    }
}

</style>
