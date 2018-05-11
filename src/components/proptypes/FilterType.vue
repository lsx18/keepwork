<template>
  <div class="filter-type">
    <p>{{$t('editor.matchingRule')}}</p>
    <el-button plain type="info" size='mini' @click='isEditorShow = true'>{{$t('editor.openRegularExpressionEditor')}}</el-button>
    <el-input type='textarea' ref='autosizeTextarea' :autosize="{ minRows:7, maxRows: maxRows }" resize='none' :placeholder='editingKey' v-model='inputTypeValue' @change='updateValue' @focus='getFocus' @blur='blurEventHandler' @input='inputValue'></el-input>
    <treeDataEditor :isEditorShow='isEditorShow' :originalTreeData='originValue' @finishEditing='finishEditing' @cancel='cancel'></treeDataEditor>
  </div>
</template>

<script>
import treeDataEditor from './FilterDataEditor.vue'

const blurMinRows = 7
const focusMinRows = 20

export default {
  name: 'PageListType',
  props: {
    editingKey: String,
    originValue: String
  },
  data() {
    return {
      isEditorShow: false,
      maxRows: blurMinRows,
      onFocus: false
    }
  },
  computed: {
    inputTypeValue: {
      get() {
        return this.originValue
      },
      set() {}
    }
  },
  methods: {
    cancel() {
      this.isEditorShow = false
    },
    finishEditing(resultMenuData) {
      this.isEditorShow = false
      var tempChangedDataObj = {}
      tempChangedDataObj[this.editingKey] = resultMenuData
      this.$emit('onPropertyChange', tempChangedDataObj)
    },
    updateValue(newVal) {
      var tempChangedDataObj = {}
      tempChangedDataObj[this.editingKey] = newVal
      this.$emit('onPropertyChange', tempChangedDataObj)
    },
    getFocus() {
      this.$emit('onChangeValue')
      this.onFocus = true
      this.maxRows = focusMinRows
      this.$nextTick(function() {
        this.$refs.autosizeTextarea.resizeTextarea()
      })
    },
    blurEventHandler() {
      this.maxRows = blurMinRows
      this.onFocus = false
      this.$nextTick(function() {
        this.$refs.autosizeTextarea.resizeTextarea()
      })
    },
    inputValue(newVal) {
      // sometimes input event can be triggered without focus, for example, the grammarly plugin for chrome
      if (!this.onFocus) this.updateValue(newVal)
    }
  },
  components: {
    treeDataEditor
  }
}
</script>

<style  lang='scss' scoped>
.filter-type {
  .el-button {
    float: right;
    width: 18%;
    height: 80px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 16px;
    color: black;
    border-radius: 5px;
  }
  .el-textarea {
    float: right;
    margin-right: 10px;
    width: 68%;
  }
}
</style>

<style lang='scss'>
.filter-type {
  .el-dialog--center .el-dialog__body {
    padding: 0 25px 30px 25px;
  }
}
</style>

