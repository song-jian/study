<template>
  <div>
    <div class="">{{amsg}}</div>
    <button @click="Abtn">A按钮</button>
  </div>
</template>
<script>
import event_btn from "../../utils/event-btn"
console.log(event_btn)
export default {
  data(){
    return {
      amsg:'我是A组件'
    }
  },
  methods:{
    Abtn(){
       this.event_btn.$emit("myFun",this.amsg)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
