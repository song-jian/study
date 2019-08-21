<template>
  <div class="space-map-wrapper">
    <BreadCrumb :data="getTitle()">
      <div slot="after" class="space-map">
        <el-button size="small" type="primary" @click="goBack">返回</el-button>
      </div>
    </BreadCrumb>
    <div class="map-content">
      <div class="top-status right">
        <div class="gplot-status-item">
          <span class="color-flag"></span>
          <span class="title">连接</span>
          <span class="color-flag abnormal"></span>
          <span class="title">中断</span>
          <span class="color-flag notactive"></span>
          <span class="title">未激活</span>
        </div>
      </div>
      <div id="spacemap" class="spacemap"></div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from "cps/bread-crumb";
import echarts from "echarts"
import spaceMap from "cps/spacemap"
export default {
  data() {
    return {
      spaceMap: null
    };
  },

  components: {
    BreadCrumb
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById("spacemap"));
    this.myChart.on('mouseup', function (params) {
          var option = spaceMap;
          option.series[0].data[params.dataIndex].x = params.event.offsetX;
          option.series[0].data[params.dataIndex].y = params.event.offsetY;
          option.series[0].data[params.dataIndex].fixed = true;
          this.setOption(option);
        });

   this.myChart.setOption(this.spaceMapData());

     },
  methods: {
    getTitle() {
      return [
        { name: "数字设备", to: "" },
        { name: "数字空间", to: "/digitalSpace" },
        { name: "服务映射", to: ""}
      ];
    },
    goBack() {
      this.$router.back();
    },
    spaceMapData() {
      return spaceMap
    }
  }
}
</script>
<style lang="less">
.space-map-wrapper {
  height: 100%;
  .space-map{
       display: flex;
      flex-direction: row-reverse;
      .el-button{
        margin-top: 8px;
      }
  }
  .map-content {
    background-color: #fff;
    height: calc(~"100% - 70px");
    box-sizing: border-box;
    padding: 20px;
    border: 1px solid #d6d7d9;
     overflow: auto;
    
    .top-status {
      .gplot-status-item {
        display: flex;
        align-items: center;
        .color-flag {
          display: inline-block;
          width: 14px;
          height: 14px;
          margin: 0 10px 0 20px;
          background: #51c451;
        }

        .abnormal {
          background: #e30836;
        }
        .notactive {
          background: #969696;
        }
        .title {
          line-height: 16px;
        }
      }
    }
    .spacemap{
      width:1000px;
      height: 1000px;
      margin-top: 20px;
     
    }
  }
}
</style>


