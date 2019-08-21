<template>
  <el-dialog
    :class="dialogCls || 'default-dialog-wrapper'"
    ref="dialog"
    :top="top"
    :title="title"
    :visible.sync="visiable"
    :close-on-click-modal="false"
    :append-to-body="_.isBoolean(appendToBody)? appendToBody : true"
    :modal="_.isUndefined(modal)? true : modal"
    @close="onClose"
  >
    <el-form
      :label-position="labelPosition || 'right'"
      ref="form"
      size="small"
      :label-width="labelWidth"
      :model="form"
      :rules="rules"
    >
      <el-form-item
        v-for="(item,i) in list"
        v-if="_.isUndefined(item.type) || item.type=='input'"
        :label="item.display"
        :key="i"
        :prop="item.prop"
      >
        <label v-if="readOnly">{{form[item.prop]}}</label>
        <el-input
          v-else
          v-model.trim="form[item.prop]"
          :disabled="item.disabled"
          auto-complete="off"
          :placeholder="item.placeholder || item.display"
          :maxlength="item.maxlength"
        />
      </el-form-item>
      <el-form-item
        v-else-if="item.type=='select'"
        :key="i"
        :label="item.display"
        :prop="item.prop"
      >
        <el-select
          v-model="form[item.prop]"
          :disabled="item.disabled"
          :placeholder="item.placeholder || item.display"
        >
          <el-option v-for="(s,j) in item.selectionList" :key="j" :label="s.name" :value="s.value" />
        </el-select>
      </el-form-item>
      <el-form-item
        v-else-if="item.type=='textarea'"
        :key="i"
        :label="item.display"
        :prop="item.prop"
      >
        <el-input
          type="textarea"
          :disabled="item.disabled"
          v-model.trim="form[item.prop]"
          :rows="3"
          :placeholder="item.placeholder || item.display"
        />
      </el-form-item>
      <slot name="after" :form="form" />
    </el-form>
    <div slot="footer" class="dialog-footer" v-if="lang.cancel && lang.confirm">
      <el-button v-if="!_.isEmpty(lang.cancel)" @click="onCancel" size="small">{{ lang.cancel }}</el-button>
      <el-button
        v-if="!_.isEmpty(lang.confirm)"
        type="primary"
        size="small"
        @click="onConfirm"
      >{{ lang.confirm }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: [
    "top",
    "readOnly",
    "dialogCls",
    "labelPosition",
    "modal",
    "appendToBody",
    "delayHide"
  ],

  data() {
    this.visibleLocker = false;
    this.repeatHandler = {};
    return {
      visiable: false,
      rules: {},
      lang: {
        cancel: "取消",
        confirm: "确定"
      },

      labelWidth: "100px",
      title: "",
      list: [],
      form: {}
    };
  },

  methods: {
    show(options) {
      this.visibleLocker = false;
      this.form = {};
      if (options) {
        this.title = options.title;
        this.list = _.map(options.list, option => {
          if (_.isString(option.name)) {
            option.display = option.name;
          }
          return option;
        });
        this.form = options.form;
        this.rules = options.rules;
        this.labelWidth = options.labelWidth || "100px";
        if (!_.isEmpty(options.btns)) {
          this.lang = options.btns;
        }
      }
      this.visiable = true;
      _.delay(() => {
        this.$refs.form.clearValidate();
      });

      return new Promise((resolve, reject) => {
        this.onCancel = () => {
          this.visibleLocker = true;
          this.hide();
          reject("cancel");
        };

        this.onClose = () => {
          if (!this.visibleLocker) {
            this.hide();
            reject("close");
          }

          this.visibleLocker = false;
        };

        this.onConfirm = () => {
          let formElement = this.$refs.form;
          formElement.validate().then(() => {
            if (this.delayHide) {
              resolve(this.form);
            } else {
              this.hide();
              resolve(this.form);
            }
          });
        };
      });
    },

    hide() {
      this.visiable = false;
    },

    onCancel: _.noop,
    onConfirm: _.noop,
    onClose: _.noop
  }
};
</script>
<style lang="less">
.default-dialog-wrapper {
  .el-dialog {
    overflow: hidden;
  }
  .el-dialog__footer {
    padding: 15px 20px;
    text-align: center;
  }
}
.view-detail-dialog {
  .el-form {
    margin-top: 20px;
    max-height: 560px;
    overflow-y: auto;
  }
  .el-form-item {
    margin-bottom: 0;
    label {
      word-break: break-word;
    }
  }
  .el-dialog__header {
    padding: 0;
  }
}
</style>
