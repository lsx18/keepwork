<template>
  <el-dialog class="tree-data-dialog" :title="$t('editor.pageListLogic')" :visible.sync="isDialogShow" width="900px" :before-close="handleClose" center>
    <p>{{$t('editor.supportWildcard')}}</p>
    <p>{{$t('editor.supportBooleanCalculation')}}</p>
    <el-input type="textarea" :rows="18" v-model="textarea"> </el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{$t('el.messagebox.cancel')}}</el-button>
      <el-button type="primary" @click="finishEditingData">{{$t('el.messagebox.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
let newMenuId = 1
export default {
  name: 'pageListDataEditor',
  props: {
    originalTreeData: String,
    isEditorShow: Boolean
  },
  data() {
    return {
      treeData: this.originalTreeData,
      textarea: '',
      defaultProps: {
        children: 'child',
        label: 'name'
      }
    }
  },
  computed: {
    isDialogShow() {
      return this.isEditorShow
    }
  },
  methods: {
    handleClose() {
      this.$emit('cancel', null)
    },
    finishEditingData() {
      this.handleClose()
      this.$emit('finishEditing', this.treeData)
    }
  }
}
</script>

<style lang='scss'>

</style>
