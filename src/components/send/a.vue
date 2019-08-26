<template>
  <div>
    <div class="">{{amsg}}</div>
    <button @click="Abtn">A按钮</button>
  </div>
</template>
<script>
import EventBtn from "../../utils/event-btn"

export default {
  data(){
    return {
      amsg:'我是A组件'
    }
  },
  methods:{
    Abtn(){
      EventBtn.emit("myFun",this.amsg)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
