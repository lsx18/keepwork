<template>
  <el-row class="pagePath comp">

    <!-- <el-col :xs="24" :sm="6" class="pagePath__page-name" :style="nameStyle"> -->
    <el-col :xs="24" :sm="6" :class="getPageNameClass">
      <a :target='target'>{{properties.name?properties.name:$t('editor.yourPage')}}</a>
    </el-col>

    <el-col :xs="24" :sm="18" class="pagePath__path-info">
      <p class="pagePath__path-info__position" :style="labelStyle">{{$t('editor.yourPosition')}}</p>
      <div class="pagePath__path-info__squeue">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item, index) in getPathData" :key="index" :style="selectStyle(index)">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-col>

  </el-row>
</template>

<script>
import compBaseMixin from '../comp.base.mixin'
import jss from 'jss'
import preset from 'jss-preset-default'

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
    getPageNameClass() {
      let PageName = 'pagePath__page-name'
      let style = {
        [PageName]: {
          'font-size': this.options.nameFontSize,
          color: this.options.nameFontColor
        },
        '@media only screen and (max-width: 767px)': {
          [PageName]: {
            'font-size': this.options.nameMobileSize
            // color: this.options.nameFontColor
          }
        }
      }
      if (!this.sheet) {
        this.sheet = jss.createStyleSheet(style)
        this.sheet.attach()
      }
      return this.sheet.classes[PageName]
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
.pagePath {
  display: flex;
  align-items: center;
  padding: 0 40px;
  background-color: #f5f5f5;
  border: 1px solid #e4e3e3;
  box-shadow: 0 0 10px #e4e3e3;
  .pagePath__page-name {
    display: flex;
    align-items: center;
  }
  .pagePath__path-info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // height: 16px;
    color: unset;
    .pagePath__path-info__position {
      // display: inline-block;
      width: 126px;
      height: 21px;
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
  .pagePath {
    display: block;
    padding: 10px;
    .pagePath__path-info {
      justify-content: flex-start;
      .pagePath__path-info__squeue {
        overflow: hidden;
        .el-breadcrumb {
          // max-width: 300px;
          overflow-x: auto;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.pagePath {
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