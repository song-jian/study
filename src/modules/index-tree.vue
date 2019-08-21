<template>
  <div v-loading="loading" class="classifytree-wrapper">
    <div class="header">
      <span>{{title}}</span>
      <el-button size="small" @click="back">{{goback}}</el-button>
    </div>
    <div class="treecontent">
      <el-tree
        node-key="id"
        default-expand-all
        :data="treeData"
        :expand-on-click-node="false"
        :props="defaultProps"
        :render-content="renderTreeContent"
      ></el-tree>
    </div>
    <Dialog ref="dialog" />
  </div>
</template>
<script>
import Dialog from "../components/dialog";
export default {
  components: { Dialog },
  data() {
    return {
      loading: false,
      treeData: [],
      title: "tree",
      goback: "返回",
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  methods: {
    getTree() {
      this.loading = true;
      this.$http
        .server(
          `${$baseApi.baseApi[0]}/componentType/getTree`,
          "Get",
          {},
          {},
          $baseApi.accessToken,
          $baseApi.appName[0]
        )
        .then(data => {
          this.treeData = [
            {
              oid: "",
              name: "分类",
              children: data
            }
          ];
          this.loading = false;
        });
    },
    back() {
      this.$router.push("/index");
    },
    renderTreeContent(h, { node, data, store }) {
      return (
        <div class="tree-wrapper">
          <span>{data.name}</span>
          <span>
            {_.size(data.oid) > 0 ? (
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit-outline"
                on-click={() => this.edit(data)}
              >
                编辑
              </el-button>
            ) : null}
            <el-button
              size="mini"
              type="text"
              icon="el-icon-plus"
              on-click={() => this.append(data)}
            >
              添加
            </el-button>
            {_.size(data.oid) > 0 ? (
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                on-click={() => this.remove(data.oid)}
              >
                删除
              </el-button>
            ) : null}
          </span>
        </div>
      );
    },
    edit(data) {
      this.showDialig(data).then((newData) => {
        let param = { oid: newData.oid, name: newData.name };
        this.$http
          .server(
            `${$baseApi.baseApi[0]}/componentType`,
            "Put",
            {},
            param,
            $baseApi.accessToken,
            $baseApi.appName[0]
          )
          .then((data) => {
            this.getTree();
          }).catch(()=>{
          });
      }).catch((error)=>{
          
      });
    },
    append(data) {
      this.showDialig().then(param => {
        param.parentId = data.oid;
        this.$http
          .server(
            `${$baseApi.baseApi[0]}/componentType`,
            "Post",
            {},
            param,
            $baseApi.accessToken,
            $baseApi.appName[0]
          )
          .then(() => {
            this.getTree();
          });
      });
    },
    remove(oid) {
      this.$alert("确定删除么", "Warning").then(() => {
        this.$http
          .server(
            `${$baseApi.baseApi[0]}/componentType/deleteByOid`,
            "Delete",
            {},
            { oid },
            $baseApi.accessToken,
            $baseApi.appName[0]
          )
          .then(() => {
            this.getTree();
          });
      });
    },
    showDialig(originalData) {
      return this.$refs.dialog.show({
        title: _.isEmpty(originalData) ? "添加" : "编辑",
        form: _.extend({ name: "" }, originalData || {}),
        list: [
          {
            display: "名称",
            prop: "name"
          }
        ],
        rules: {
          name: { required: true, message: "required" }
        }
      });
    }
  },
  created() {
    this.getTree();
  }
};
</script>
<style lang="less">
@import "../assets/variable.less";
.classifytree-wrapper {
  background-color: #f2f4f6;
  border-radius: 3px;
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  .header {
    display: table;
    padding: 10px 20px;
    border-bottom: 1px solid @weakLineColor;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    line-height: 32px;

    .el-button {
      float: right;
    }
  }
  .treecontent {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    height: calc(~"100% - 55px");
    padding: 0 20px;
    background-color: #fff;
    .el-tree {
      width: 100%;
      height: 100%;
      overflow-y: auto;
    }
  }
  .tree-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    width: 100%;
    .el-button--text {
      color: #606266 !important;
    }
  }
}
</style>


