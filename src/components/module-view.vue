/**
*@description 页面布局组件,将整个页面分为 上，中，下 三块，上，中，下 三块都能通过样式设置高宽
*
*@author Gill Gong
*@email gill@jwis.cn
*/

<template>
  <div class="view-structure-w">
    <div v-if="!_.isEmpty(this.$slots.header)" class="view-header">
      <slot name="header" />
    </div>
    <div v-if="!_.isEmpty(this.$slots.middle)" class="view-middle">
      <slot name="middle" />
    </div>
    <div v-if="!_.isEmpty(this.$slots.footer)" class="view-footer">
      <slot name="footer" />
    </div>
    <slot v-if="!_.isEmpty(this.$slots.full)" name="full" />
  </div>  
</template>

<style lang="less">
@import "../assets/variable.less";
  .view-structure-w {
    height: 100%;
    display: flex;
    background: #fff;
    flex-direction: column;
  }

  // .view-middle {
  //   flex: 1;
  //   overflow-y: auto;
  // }
</style>
