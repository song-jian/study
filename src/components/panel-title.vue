/** 
 * Panel 顶部的title显示板
 *
 *@author gill
 *@date 2018-05-10
 */

<template>
  <div class="panel-title" v-if="title && title.length">
    <div class="header">
      <span >{{title}}</span>
      <el-button  size="small" v-if="back" @click="onBack">返回</el-button>
    </div>
    <slot name="after"></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: [String],
  },

  data() {
     return {
       back:_.isFunction(this.$listeners.back) 
     }
   
  },
  mounted(){
   
  },
  
  methods: {
    onBack(e) {
      if(this.back){
        this.$emit('back',e)
      }
    }
  }
}
</script>

<style lang="less">
@import "../assets/variable.less";

.panel-title {
  padding: @jw10 15px;
  line-height: 30px;
  border-bottom: 1px solid @weakLineColor;
  font-size: @fontLarge;
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
}
</style>