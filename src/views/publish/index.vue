<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 表单 表单里有个属性 label width 设置宽度-->
    <el-form
      ref="publishForm"
      :model="formData"
      :rules="publishRules"
      style="margin-left:50px"
      label-width="100px"
    >
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:60%"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <quill-editor style="height:400px" v-model="formData.content" :rows="4"></quill-editor>
      </el-form-item>
      <el-form-item prop="type" label="封面" style="margin-top:140px">
        <!-- //绑定封面得类型  //@change="changeType"-->
        <el-radio-group @change="changeType" v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <!-- 放置一个封面组件 -->
        <cover-image></cover-image>
      </el-form-item>
      <!-- 放置一个封面组件  父组件  => 子组件 props @clickOneImg="receiveImg"-->
      <cover-image  @clickOneImg="receiveImg" :list="formData.cover.images"></cover-image>
      <el-form-item prop="channel_id" label="频道">
        <el-select v-model="formData.channel_id">
          <!-- 循环生成多个el-option  label指的是 el-option的显示值 value指的是 el-option的存储值 -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!-- @事件名="方法" =>有默认参数 => 方法()  => 方法() =>一个参数都没有 -->
        <el-button @click="publishArticle()" type="primary">发布</el-button>
        <el-button @click="publishArticle(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 定义一个channels  接受频道
      formData: {
        title: '', // 标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1 自动 0无图 1一张 3 三张
          images: [] // 存储图片地址
        },
        channel_id: null // 频道id
      },
      publishRules: {
        // 校验规则对象
        title: [
          { required: true, message: '标题内容不能为空' },
          { min: 5, max: 30, message: '标题长度在5-30字符之间' }
        ],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道分类不能为空' }]
      }
    }
  },
  watch: {
    $route: function (to, from) {
      if (Object.keys(to.params).length) {
        // 有参数 就 修改
        this.getChannels(to.params.articleId) // 重新拉去数据
      } else {
        // 没有参数 就发布
        this.formData = {
          title: '', // 标题
          content: '', // 文章内容
          cover: {
            type: 0, //   封面类型 -1:自动，0-无图，1-1张，3-3张
            images: [] // 存储的图片的地址
          }
        }
      }
    }
    // // 监控嵌套对象中得值
    // 'formData.cover.type': function () {
    // //  this指向组件实例
    //   if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
    //   // 无图或者自动模式
    //     this.formData.cover.images = []
    //   } else if (this.formData.cover.type === 1) {
    //     this.formData.cover.images = [''] // 单图模式
    //   } else if (this.formData.cover.type === 3) {
    //     this.formData.cover.images = ['', '', ''] // 单图模式
    //   }
    // }

  },
  methods: {
    receiveImg (img, index) {
      // 接受到数据之后 修改 images数组 但是images是个数组['','','']
      // 有地址 有索引 能不能改image
      // this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
      //   if (i === index) {
      //     return img
      //   } return item
      // })   这个是低版本
      // vue响应式原理 响应式数据  数据发生变化 视图变化
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? img : item)
    },
    // 切换类型时触发  该方法 只有点击切换时才会触发
    changeType () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        // 无图或者自动模式
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = [''] // 单图模式
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', ''] // 单图模式
      }
    },
    // 获取文章详情通过id
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        console.log(result)
        this.formData = result.data // 将指定文章得数据 给data数据
      })
    },
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 发布文章
    publishArticle (draft) {
      this.$refs.publishForm.validate(isOk => {
        if (isOk) {
          // 可以进行 发布接口调用
          let { articleId } = this.$route.params // 回去动态路由参数 articleId已经是字符串
          this.$axios({
            method: articleId ? 'put' : 'post',
            url: articleId ? `/articles/${articleId}` : `/articles`,
            params: { draft }, // query参数
            data: this.formData
          }).then((res) => {
            // 新增成功 跳到内容列表
            this.$router.push('/home/articles')
          })
        }
      })
    }
    // if (articleId) {
    //   // 修改文章
    //   this.$axios({
    //     method: 'put',
    //     url: `/articles/${articleId}`,
    //     params: { draft }, // query参数
    //     data: this.formData
    //   }).then(() => {
    //   // 新增成功 => 应该去内容列表
    //     this.$router.push('/home/articles') // 回到内容列表
    //   })
    // } else {
    // // 可以去进行 发布接口调用
    //   this.$axios({
    //     url: '/articles',
    //     method: 'post',
    //     params: { draft }, // query参数
    //     data: this.formData
    //   }).then(() => {
    //   // 新增成功 => 应该去内容列表
    //     this.$router.push('/home/articles') // 回到内容列表
    //   })
    // }
  },
  created () {
    this.getChannels() // 获取频道数据
    // 获取id  判断有无 id 有就修改 没有就发布
    let { articleId } = this.$route.params // 获取动态路由参数  articleId已经是字符串
    articleId && this.getArticleById(articleId) // 获取文章数据
  }
}
</script>

<style>
</style>
