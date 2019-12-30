<template>
<div class="cover-iamge">
    <div style="display: inline-block;" @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-item">
        <img :src="item?item:defaultImg" alt="">
    </div>
    <!-- 默认生成的元素在body上 用visible控制显示隐藏 -->
    <el-dialog :visible="dialogVisible" @close="closeDialog">
        <!-- 选择素材组件 -->
        <!-- 监听谁的事件  就在谁的标签上写监听 -->
        <select-image @selectOneImg ="receiveImg"></select-image>
    </el-dialog>
</div>
</template>

<script>
export default {
  props: ['list'], // 接受属性
  data () {
    return {
      dialogVisible: false, // 控制弹层打开关闭的变量
      defaultImg: require('../../assets/img/pic_bg.png'), // 将图片变成变量
      selectIndex: -1 // 默认下标 -1
    }
  },
  methods: {
    receiveImg (img) {
      // props是只读的 不能修改
      // 接收数据之后 发现 list为props数据 要想修改 => 再次传递
      this.$emit('clickOneImg', img, this.selectIndex) // 再次触发一个自定义事件
      this.closeDialog() // 直接关闭弹层
    },
    // 打开
    openDialog (index) {
      this.selectIndex = index // 记住点击的下标
      this.dialogVisible = true // 打开弹层
    },
    // 关闭
    closeDialog () {
      this.dialogVisible = false // 关闭弹层
    }
  }

}
</script>

<style lang="less" scoped>
.cover-iamge {
    display: flex;
    margin:20px 0;
    margin-left: 100px;
     .cover-item {
       width: 250px;
       height: 250px;
      //  padding: 10px;
       img {
        border: 1px solid red;
         height: 100%;
         width:100%;
       }
     }
  }

</style>
