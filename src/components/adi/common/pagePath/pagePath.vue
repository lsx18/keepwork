<template>
  <el-row class="comp-pagePath">
    <el-col :xs="24" :sm="6" class="pathName" :style="nameStyle">
      <a :target='target'>{{properties.name?properties.name:$t('editor.yourPage')}}</a>
    </el-col>
    <el-col :xs="24" :sm="18" class="wrapper-right">
      <p :style="labelStyle">{{$t('editor.yourPosition')}}</p>

      <div class="pathContainer">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item, index) in getPathData" :key="index" :style="selectStyle(index)">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

    </el-col>
  </el-row>
</template>

<script>
import compBaseMixin from '../comp.base.mixin'
export default {
  name: 'AdiPagePath',
  mixins: [compBaseMixin],
  methods: {
    selectStyle(index) {
      if (index == this.getPathData.length - 1) {
        return this.pageStyle
      } else {
        return this.labelStyle
      }
    }
  },
  computed: {
    target() {
      return this.properties.target
    },
    nameStyle() {
      return this.generateStyleString({
        'font-size': this.options.nameFontSize,
        color: this.options.nameFontColor
      })
    },
    labelStyle() {
      return this.generateStyleString({
        'font-size': this.options.commonSize,
        color: this.options.labelFontColor
      })
    },
    pageStyle() {
      return this.generateStyleString({
        'font-size': this.options.commonSize,
        color: this.options.pageFontColor
      })
    },
    getPathData() {
      let pathData
      if (this.properties.path && this.properties.path.length == 0) {
        pathData = [this.$t('editor.defaultPage'), this.$t('editor.yourPage')]
      } else {
        pathData = this.properties.path.split('>')
      }
      return pathData
    }
  }
}
</script>

<style lang="scss" scoped>
.comp-pagePath {
  display: flex;
  align-items: center;
  padding: 0 40px;
  background-color: #f5f5f5;
  border: 1px solid #e4e3e3;
  box-shadow: 0 0 10px #e4e3e3;
  .pathName {
    display: flex;
    align-items: center;
  }
  .wrapper-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // height: 16px;
    color: unset;
    p {
      display: inline-block;
      width: 126px;
    }
    .el-breadcrumb {
      color: unset;
      .el-breadcrumb__item {
        display: flex;
        align-items: center;
      }
    }
  }
}
@media only screen and (max-width: 767px) {
  .comp-pagePath {
    display: block;
    padding: 0 10px;
    .wrapper-right {
      justify-content: flex-start;
      .pathContainer {
        max-width: 300px;
        overflow: hidden;
        .el-breadcrumb {
          overflow-x: auto;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.comp-pagePath {
  .el-breadcrumb__item {
    .el-breadcrumb__inner {
      font-weight: normal;
      color: unset;
    }
    .el-breadcrumb__inner:hover {
      color: unset;
    }
  }
}
</style>