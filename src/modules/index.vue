<template>
  <div class="index_warpper">
   <div  class="my_nav">
      <i class="el-icon-menu" @click="isCollapse = !isCollapse"></i>
    <el-menu 
       class="my_menu"
       :collapse="isCollapse" 
       :default-active="$route.path"
       router>
      <Menu :datalist="datalist"></Menu>
    </el-menu>
   </div>
   <div class="my_content">
      <keep-alive>
        <router-view></router-view>
    </keep-alive>
   </div>
  </div>
</template>
<script>
import Menu from "../components/aside";
export default {
  components: { Menu },
  data() {
    return {
      datalist: [
        {
          id:'1',
          name: "组件管理",
          icon: "el-icon-location",
          children: [
            {
              id:'2',
              name: "选项一",
              path: "indexTree"
            },
            {
              id:'3',
              name: "选项二",
              path: "/3",
              
            },
            { 
              id:'4',
              name: "选项三",
              path: "/4"
            }
          ]
        },
        {
          id:'5',
          name: "组件参数管理",
          icon: "el-icon-menu",
          path: "/5",
          children: [
            {
              id:'6',
              name: "选项一",
              path: "/6",
            },  
            {
              id:'7',
              name: "选项二",
              path: "/7",
              children:[
                  {
                      name:"title1",
                      path: "/7",
                  },
                  {
                      name:"title2",
                      path: "/7",
                  }
              ]
            }
          ]
        },
        {
          id:'8',
          name: "组件api管理",
          icon: "el-icon-setting",
          path: "/8",
          children: [
            {
              name: "选项一",
              icon: "",
              path: "/9"
            }
          ]
        },
        {
          id:'9',
          name: "镜像仓库管理",
          icon: "el-icon-share",
          path: "indexTable"
        }
      ],
      isCollapse:false,
    };
  },
};
</script>
<style lang="less">
.index_warpper{
  height: 100%;
  display: flex;
  width: 100%;
  font-size: 16px;
  .my_nav{
    height: 100%;
    position: relative;
    box-shadow: 5px -10px 15px 0 rgba(0, 0, 0, 0.07);
    >i{
      position: absolute;
      right: 20px;
      line-height: 36px;
      cursor: pointer;
      font-size: 20px;
    }
    .my_menu.el-menu{
      margin-top: 36px;
      height: calc(100% - 36px);
      border-right:none; 
      .el-submenu__title{
        font-size: 16px;
      }
      .el-submenu__icon-arrow{
        right: 25px;
      }
    }
    .my_menu:not(.el-menu--collapse) {
       width: 250px;
    }
  }
  .my_content{
    width: calc(100% - 250px);
    height: 100%;
  }
}

</style>


