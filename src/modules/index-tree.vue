<template>
  <div v-loading="loading" class="classifytree-wrapper">
    <BreadCrumb :data="getTitle()">
      <div class="back" slot="after">
        <el-button type="primary" size="small">返回</el-button>
      </div>
    </BreadCrumb>
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
import BreadCrumb from "../components/bread-crumb";
export default {
  components: { Dialog, BreadCrumb },
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
  created() {
    this.getTree();
  },
  methods: {
    getTitle() {
      return [{ name: "tree" }];
    },
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
                icon="el-icon-edit-outline"
                on-click={() => this.edit(data)}
              >
                编辑
              </el-button>
            ) : null}

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
      this.showDialig(data)
        .then(newData => {
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
            .then(data => {
              this.getTree();
            })
            .catch(() => {});
        })
        .catch(error => {});
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
  }
};
</script>
<style lang="less" scpoed>
@import "../assets/variable.less";
.classifytree-wrapper {
  background-color: #f2f4f6;
  padding: 0px 20px 20px;
  height: 100%;
  width: calc(100% -250px);
  box-sizing: border-box;
  .back {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .treecontent {
    padding-bottom: 20px;
    height: calc(~"100% - 50px");
    border: 1px solid @weakLineColor;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 4px;
    .el-tree {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      overflow-y: auto;
    }
    .el-tree-node__content {
      border-bottom: 1px solid @weakLineColor;
      padding: 7px 15px;
      &:hover {
        background-color: #ecf5ff;
      }
    }
    .tree-wrapper {
      align-items: center;
      width: 100%;
      > span:nth-child(1) {
       font-size: 14px;
      }
      > span:nth-child(2) {
        position: absolute;
        left: 400px;
        font-size: 16px;
        i{
          font-size: 14px;
        }
      }
      .el-button--text {
        color: #606266 !important;
      }
    }
  }
}
</style>


