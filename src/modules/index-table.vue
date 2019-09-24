<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 10:33:32
 * @LastEditTime: 2019-08-23 14:34:26
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="right_wrapper">
    <BreadCrumb :data="breadCrumbinit()" :separator="'>'" />
    <ModuleView class="right_content">
      <PanelTitle slot="header" :title="title" @back="back" />
      <div slot="middle" class="right_table_content">
        <div>
          <el-button icon="el-icon-circle-plus-outline" size="small" @click="goCreateForm">添加</el-button>
          <el-button icon="el-icon-delete" size="small" @click="deleteSelect">删除</el-button>
          <el-button icon="el-icon-share" size="small" @click="goTree()">tree</el-button>
        </div>
        <div class="top_search">
          <el-input suffix-icon="el-icon-search" type="text" placeholder="搜索" v-model="searchKey"></el-input>
          <el-button icon="el-icon-circle-plus-outline" size="small">导入</el-button>
        </div>
      </div>
      <Table
        slot="footer"
        ref="table"
        :data="tableData"
        :header="getHeader()"
        :isRowIndex="true"
        :ifPage="true"
        :isSelection="true"
        :pageSize="pageSize"
        :showPagination="true"
        isAllLayout="true"
        :totalCount="totalCount"
        :currentPage="currentPage"
        :rowContCheckBox="false"
        @size-change="onPageSizeChange"
        @on-page-change="onPageIndexChange"
        v-loading="loading"
      ></Table>
    </ModuleView>
  </div>
</template>
<script>
import BreadCrumb from "../components/bread-crumb";
import ModuleView from "../components/module-view";
import PanelTitle from "../components/panel-title";
import Table from "../components/table/table";
import toop from "../utils";
import dialogVue from "../components/dialog.vue";
import tableData from "../assets/tableData";
export default {
  components: {
    BreadCrumb,
    ModuleView,
    PanelTitle,
    Table
  },

  data() {
    return {
      loading: false,
      title: "组件管理",
      pageNum: 1,
      pageSize: 15,
      currentPage: 1,
      searchKey: "",
      totalCount: 18,
      // tableData:tableData,
      tableData: []
    };
  },
  methods: {
    breadCrumbinit() {
      return [
        {
          name: "导航一",
          to: "/index"
        },
        {
          name: "选项一",
          to: ""
        }
      ];
    },
    back() {
      this.$router.push("/indexTree");
    },
    fetch() {
      this.loading = true;
      this.$http(
        `${$baseApi.baseApi[0]}/component/getPaged`,
        "Get",
        {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          searchKey: "",
          orderBy: "a.createdTime",
          ascDesc: "DESC"
        },
        {},
        $baseApi.accessToken,
        $baseApi.appName[0]
      ).then(({ rows, count }) => {
        this.tableData = rows;
        this.totalCount = count;
        this.loading = false;
      });
    },
    getHeader() {
      let self = this;
      return [
        {
          prop: "code",
          display: "编码"
        },
        {
          prop: "name",
          display: "名称"
        },
        {
          prop: "remark",
          display: "备注"
        },
        {
          prop: "createdTime",
          display: "创建时间",
          formatter: row => {
            return toop.formatDate(new Date(row.createdTime), 3);
          }
        },
        {
          display: "锁定",
          formatter: row => {
            return (
              <div>
                <el-switch
                  v-model={row.isLocked}
                  active-value={0}
                  inactive-value={1}
                  onChange={() => self.changeLocked(row)}
                ></el-switch>
              </div>
            );
          }
        },
        {
          display: "操作",
          width: 160,
          formatter(row) {
            return (
              <div class="component-operate-wrapper">
                <el-button
                  title={row.isLocked ? "无法编辑" : "编辑"}
                  size="small"
                  type="text"
                  class="iconfont el-icon-edit"
                  onClick={() => {
                    // self.goComponentEdit(row);
                  }}
                  disabled={row.isLocked ? true : false}
                />

                <el-button
                  title="删除"
                  size="small"
                  type="text"
                  icon="iconfont el-icon-delete"
                  onClick={() => {
                    self.delete([row.oid]);
                  }}
                />
                <el-button
                  title="查看"
                  size="small"
                  type="text"
                  icon="iconfont el-icon-share"
                  onClick={() => {
                    // self.goComponentView(row);
                  }}
                />
              </div>
            );
          }
        }
      ];
    },
    onPageSizeChange(paegSize) {
      this.pageSize = paegSize;
      this.fetch();
    },
    onPageIndexChange(pageIndex) {
      this.currentPage = pageIndex;
      this.fetch();
    },
    formatData(data, type) {
      return toop.formatDate(new Date(), 3);
    },
    goTree() {
      this.$router.push("/indexTree");
    },
    changeLocked(row) {
      row.isLocked = row.isLocked ? 1 : 0;
      let data = {
        isLocked: row.isLocked ? 1 : 0,
        oid: row.oid
      };
      this.$http(
        `${$baseApi.baseApi[0]}/component/lockOrUnlock`,
        "Put",
        {},
        data,
        $baseApi.accessToken,
        $baseApi.appName[0]
      )
        .then(() => {})
        .catch(error => {
          this.$error(error.msg);
        });
    },
    deleteSelect() {
      let selected = this.$refs.table.getSelection();
      if (selected.length) {
        selected = this._.map(selected, one => {
          return one.oid;
        });
        this.delete(selected);
      }
    },
    delete(oids) {
      this.$alert("确定删除", "Warning").then(() => {
        this.$http(
          `${$baseApi.baseApi[0]}/component`,
          "Delete",
          {},
          oids,
          $baseApi.accessToken,
          $baseApi.appName[0]
        )
          .then(() => {
            this.fetch();
          })
          .catch(error => {
            this.$error(error.msg);
          });
      });
    },
    goCreateForm() {
      this.$router.push("/createform");
    }
  },
  mounted() {
    this.delaySearch = _.debounce(this.fetch.bind(this), 500);
    this.fetch();
    // this.formatData();
  }
};
</script>
<style lang="less">
@import "../assets/variable.less";
.right_wrapper {
  height: 100%;
  width: 100%;
  background-color: @weakBackgroundColor;
  padding: 0 20px 20px;
  box-sizing: border-box;
  .right_content {
    height: calc(~"100% - 50px");
    border: 1px solid @boxBorderLineColor;
    box-sizing: border-box;
    border-radius: 3px;
    .right_table_content {
      box-sizing: border-box;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      .top_search {
        display: flex;
        justify-content: space-around;
        .el-input {
          margin-right: 10px;
        }
        .el-input__inner {
          height: 34px;
          line-height: 34px;
        }
      }
    }
    .view-footer {
      flex: 1;
      overflow: auto;
      box-sizing: border-box;
      padding: 0 15px;
    }
  }
}
</style>

