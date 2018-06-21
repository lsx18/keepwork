<template>
  <el-row class="pagePath comp">
    <el-col :xs="24" :sm="6" :class="getPageNameClass.pageNameClass">
      <span>{{properties.name?properties.name:$t('editor.yourPage')}}</span>
    </el-col>

    <el-col :xs="24" :sm="18" class="pagePath__path-info">
      <div class="pagePath__path-info__position" :class="getPageNameClass.labelNameClass">
        <span>{{$t('editor.yourPosition')}}</span>
      </div>
      <div class="pagePath__path-info__squeue">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item, index) in getPathData" :key="index" :class="selectStyle(index)">
            <a :href="item.link" :target='target'>{{item.title}}</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import compBaseMixin from '../comp.base.mixin'
import jss from 'jss'
import preset from 'jss-preset-default'
import { search } from '@/api/esGateway'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'AdiPagePath',
  mixins: [compBaseMixin],
  created() {
    this.getSource()
  },
  methods: {
    selectStyle(index) {
      if (index == this.getPathData.length - 1) {
        return this.getPageNameClass.pathNameClass
      } else {
        return this.getPageNameClass.labelNameClass
      }
    },
    formatData(source) {
      let pageData = []
      let allData = source && source.hits && source.hits.hits

      _.forEach(allData, (item, index) => {
        let eachData = {
          nameArray: '',
          lastName: '',
          link: item._source['url']
        }

        let array = item._source['pagename'].split('/')
        eachData['nameArray'] = array
        eachData['lastName'] = array[array.length - 1]

        if (this.properties.name == eachData.lastName) {
          _.forEach(eachData.nameArray, (each, key) => {
            let eachName = {
              title: each,
              link: ''
            }
            pageData.push(eachName)
            // if (this.eachName.title == eachData.lastName) {
            //   this.eachName.link = this.eachData.link
            // }
          })
        }
      })

      if (pageData) {
        return pageData
      } else {
        alert(this.$t('editor.notExist'))
      }
    },
    async getSource() {
      if (!this.properties.name) {
        return
      }

      let url = this.activePageInfo.sitepath

      let index = process.env.ES_INDEX
      let type = process.env.ES_TYPE
      let body = {
        query: {
          bool: {
            must: {
              match: {
                url: {
                  query: url,
                  operator: 'and'
                }
              }
            },
            must_not: [
              {
                match: {
                  url: '.gitignore'
                }
              }
            ]
          }
        },
        size: 17
      }

      let source = await search({ index, type, body })
      this.formatData(source)
    }
  },
  computed: {
    ...mapGetters({
      activePageInfo: 'activePageInfo',
      getGitlabAPI: 'gitlab/getGitlabAPI',
      getProjectIdByPath: 'gitlab/getProjectIdByPath',
      repositoryTreesAllFiles: 'gitlab/repositoryTreesAllFiles'
    }),
    target() {
      return this.properties.target
    },
    getPageNameClass() {
      let pageName = 'pagePath__page-name'
      let labelName = 'pagePath__path-info__position'
      let pathName = 'breadcrumb-item'

      let style = {
        [pageName]: {
          'font-size': this.options.nameFontSize,
          color: this.options.nameFontColor
        },
        [labelName]: {
          'font-size': this.options.commonSize,
          color: this.options.labelFontColor
        },
        [pathName]: {
          'font-size': this.options.commonSize,
          color: this.options.pageFontColor
        },
        '@media only screen and (max-width: 767px)': {
          [pageName]: {
            'font-size': this.options.nameMobileSize
          },
          [labelName]: {
            'font-size': this.options.commonMobileSize
          },
          [pathName]: {
            'font-size': this.options.commonMobileSize
          }
        }
      }
      if (!this.sheet) {
        this.sheet = jss.createStyleSheet(style)
        this.sheet.attach()
      }
      return {
        pageNameClass: this.sheet.classes[pageName],
        labelNameClass: this.sheet.classes[labelName],
        pathNameClass: this.sheet.classes[pathName]
      }
    },
    getPathData() {
      let pathData
      if (this.properties.name.length == 0) {
        pathData = [
          { title: this.$t('editor.defaultPage'), link: '' },
          { title: this.$t('editor.yourPage'), link: '' }
        ]
      } else {
        pathData = this.getSource()
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
  padding: 20px 40px;
  background-color: #f5f5f5;
  border: 1px solid #e4e3e3;
  box-shadow: 0 0 10px #e4e3e3;

  .pagePath__path-info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: unset;
    white-space: nowrap;

    .pagePath__path-info__position {
      width: 126px;
      line-height: 1;
    }

    .pagePath__path-info__squeue {
      overflow-x: hidden;

      .el-breadcrumb {
        color: unset;
        overflow-x: auto;
        overflow-y: hidden;
        display: flex;
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
      margin-top: 5px;

      .pagePath__path-info__position {
        width: 84px;
      }
      .pagePath__path-info__squeue {
        .el-breadcrumb {
          max-width: 604px;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.pagePath {
  .el-breadcrumb__item {
    a {
      text-decoration: none;
    }
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