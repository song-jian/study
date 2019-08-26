<template>
  <div>
    <div class>{{bmsg}}</div>
  </div>
</template>
<script>
import EventBtn from "../../utils/event-btn";
console.log(EventBtn.on)
export default {
  data() {
    return {
      bmsg: "我是b组件"
    };
  },
  created(){
    this.bbtn();
  },
  methods: {
    bbtn() {
      EventBtn.on("myFun", message => {
        //这里最好用箭头函数，不然this指向有问题
        this.bmsg = message;
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
