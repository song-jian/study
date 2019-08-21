/**
* @description 面包屑组件
*
* @author Barry
* @email barry.li@jwis.cn
*/

<template>
  <div class="jw-breadcrumb-wrap">
    <ul class="breadcrumb-item">
      <li class="inline-block" v-for="(item,i) in data">
        <span :class="{'link':item.to}" @click="onClick(item)">{{item.name}}</span>
        <span v-if="i < data.length-1" class="separator">{{separator}}</span>
      </li>
    </ul>

    <div class="breadcrumb-slot" :style="setSlotWidth()">
      <slot name="after"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },

    separator: {
      type: String,
      default: ">"
    },

    slotWidth: {
      type: String,
      default: null
    }
  },

  data() {
    return {};
  },

  methods: {
    onClick(item) {
      if (item.to) {
        this.$router.push({
          path: item.to
        });
      }
    },

    setSlotWidth() {
      if (!!this.slotWidth) {
        return {
          "flex-basis": this.slotWidth
        };
      } else {
        return {
          flex: 1
        };
      }
    }
  }
};
</script>

<style lang="less">
.jw-breadcrumb-wrap {
  display: flex;
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  color: #606266;
 
  .breadcrumb-item {
    flex: 1;
  }

  .breadcrumb-slot {
    /* flex: 1; */
  }

  .inline-block {
    display: inline-block;

    .link {
      cursor: pointer;
    }
  }

  .inline-block:last-child {
    color: #333;
  }

  .separator {
    display: inline-block;
    padding: 0 5px;
  }
}
</style>