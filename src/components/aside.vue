<template>
  <div>
    <template v-for="(list,i) in datalist">
      <el-submenu v-if="list.children" :key="i" :data="list" :index="list.id">
        <template slot="title">
          <i :class="list.icon"></i>
          <span>{{list.name}}</span>
        </template>
        <Menu :datalist="list.children"></Menu>
      </el-submenu>
       <el-menu-item v-else :key="i" :data="list" :index="list.path">
        <i :class="list.icon"></i>
        <span slot="title">{{list.name}}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
export default {
  name: "Menu",
  props: ["datalist"],
  data() {
    return {
    };
  }
};
</script>
<style lang="less">
.el-menu--collapse span,
.el-menu--collapse i.el-submenu__icon-arrow {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
</style>


