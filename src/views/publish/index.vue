<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 表单 表单里有个属性 label width 设置宽度-->
    <el-form ref="publishForm" :model="formData" :rules="publishRules" style="margin-left:50px" label-width="100px">
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:60%"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <el-input v-model="formData.content" type="textarea" :rows="4"></el-input>
      </el-form-item>
      <el-form-item prop="type" label="封面">
        <!-- //绑定封面得类型 -->
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="channel_id" label="频道">
        <el-select v-model="formData.channel_id" value="1">
            <!-- 循环生成多个el-option  label指的是 el-option的显示值 value指的是 el-option的存储值 -->
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="publishArticle()" type="primary">发布</el-button>
        <el-button  @click="publishArticle(true)">存入草稿</el-button>
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
        title: [{ required: true, message: '标题内容不能为空' }, { min: 5, max: 30, message: '标题长度在5-30字符之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道分类不能为空' }]
      }
    }
  },
  methods: {
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
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          // 可以进行 发布接口调用
          this.$axios({
            url: 'articles',
            method: 'post',
            params: { draft }, // query参数
            data: this.formData
          }).then(() => {
            // 新增成功 跳到内容列表
            this.$router.push('/home/articles')
          })
        }
      })
    }

  },
  created () {
    this.getChannels() // 获取频道数据
  }
}
</script>

<style>
</style>
