<template>
  <div class='comp-pagelist'>
    <el-collapse-transition>
      <!-- <el-tree :data="data" :props="defaultProps" :render-content="renderContent"></el-tree> -->
      <el-tree :data="filter(data)" :props="defaultProps" :render-content="renderContent" :filter-node-method="filterNode" ref="tree2" default-expand-all></el-tree>
    </el-collapse-transition>
  </div>
</template>

<script>
import compBaseMixin from '../comp.base.mixin'
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import { gitTree2NestedArray } from '@/lib/utils/gitlab'

export default {
  name: 'AdiPageList',
  mixins: [compBaseMixin],
  async created() {
    await this.getRepositoryTree({ path: this.activePageInfo.sitepath })

    let allFiles = this.repositoryTreesAllFiles
    let filterFiles = []

    _.forEach(allFiles, (item, key) => {
      let beAdd = true

      if (item.path.split('/')[2] == '_config') {
        beAdd = false
      }

      if (item.path.match('.gitignore.md')) {
        beAdd = false
      }

      if (beAdd) {
        filterFiles.push(item)
      }
    })

    this.data = gitTree2NestedArray(filterFiles, this.activePageInfo.sitepath)

    // function getNode(data, nodeName) {
    //   //1.第一层 root 深度遍历整个data
    //   for (var i = 0; i < data.length; i++) {
    //     if (node) {
    //       break
    //     }
    //     var obj = data[i]
    //     //没有就下一个
    //     if (!obj || !obj.name) {
    //       continue
    //     }

    //     //2.有节点就开始找，一直递归下去
    //     if (obj.name == nodeName) {
    //       //找到了与nodeName匹配的节点，结束递归
    //       node = obj
    //       break
    //     } else {
    //       //3.如果有子节点就开始找
    //       if (obj.children) {
    //         //4.递归前，记录当前节点，作为parent 父亲
    //         parentNode = obj
    //         //递归往下找
    //         getNode(obj.children, nodeName)
    //       } else {
    //         //跳出当前递归，返回上层递归
    //         continue
    //       }
    //     }
    //   }

    //   //5.如果没找到父节点，置为null，因为没有父亲
    //   if (!node) {
    //     parentNode = null
    //   }

    //   //6.返回结果obj
    //   return {
    //     parentNode: parentNode,
    //     node: node
    //   }
    // }
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    ...mapGetters({
      activePageInfo: 'activePageInfo',
      repositoryTreesAllFiles: 'gitlab/repositoryTreesAllFiles'
    })
  },
  methods: {
    ...mapActions({
      getRepositoryTree: 'gitlab/getRepositoryTree'
    }),
    handleNodeClick(data) {
      console.log(data)
    },
    renderContent(h, { data, note, store }) {
      return <div>{data.name}</div>
    },
    // find() {
    //   for (let i in data) {
    //     // if (node) {
    //     //   break
    //     // }
    //     // // let obj = data[i]
    //     // //没有就下一个
    //     // if (!data[i] || !data[i].name) {
    //     //   continue
    //     // }

    //     if (data[i].type == 'blob') {
    //       if (data[i].name.match(reg)) {
    //         arr.push(data[i])
    //       } else {
    //         //跳出当前递归，返回上层递归
    //         continue
    //       }
    //     } else {
    //       //如果是文件夹就递归
    //       if (data[i].children) {
    //         //递归往下找
    //         find(data[i].children)
    //       } else {
    //         //跳出当前递归，返回上层递归
    //         continue
    //       }
    //     }
    //     // if (data[i].children) {
    //     //   // let node = null
    //     //   // let parentNode = null
    //     //   // var obj = getNode(data, reg)
    //   }
    // },
    filter(data) {
      // let temp = '^.*abc.*$'
      let temp = `^.*${this.properties.inputData || ''}.*$`
      let reg = new RegExp(temp, '')
      // let reg = new RegExp('tes', '')

      // console.log(this.properties.inputData)
      // console.log(data)
      // console.log(this)
      // console.log(this.$options)
      // return data
      let arr = []

      for (let i in data) {
        if (data[i].type == 'blob') {
          if (data[i].name.match(reg)) {
            arr.push(data[i])
          }
        } else {
          // //如果是文件夹就递归
          if (data[i].children) {
            //递归往下找
            arr.push(data[i])
            // find(data[i].children)
          }
          // else {
          //   //跳出当前递归，返回上层递归
          //   continue
          // }
        }
      }
      // this.find
      // arr.forEach(item => {
      //   if (item.id == id) {
      //     return item
      //   } else if (item.children.length > 0) {
      //     find(item.children, id)
      //   }
      // })
      return arr
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    }
  }
}
</script>

<style lang="scss" scoped>
.comp-pagelist {
  width: auto;
}
</style>

<style lang="scss">
.comp-pagelist {
  .el-tree__empty-block {
    min-height: auto;
  }
  .el-tree__empty-text {
    position: relative;
    left: auto;
    top: auto;
  }
}
</style>
