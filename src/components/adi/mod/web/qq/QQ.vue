<script>
/*doc
---
title: QQ Mod
name: QQ Mod
category: Adi Mod
---

This is the QQ Mod for usage.

```@QQ
styleID: // 样式ID
qq:
  number: // 填写QQ号码
pic:
  src: // 图片来源地址链接
  link: // 图片点击跳转链接
  target: // 链接从新窗口打开或本窗口打开
desc:
  name: // 描述名称
  link: // 描述点击跳转链接
  target: // 链接从新窗口打开或本窗口打开

```

*/
import _ from 'lodash'
import baseMixin from '../../base/base.mixin'

export default {
  mixins: [baseMixin],
  mounted() {
    // console.log(this.$el.children)
    // console.log(this.$el.getBoundingClientRect().height)
    // console.log(this)
    // console.log(this.$refs.tit)
    // return (this.$el.innerHTML = 'bian')
  },
  created() {
    // console.log(this.$refs.re)
  },
  updated() {
    // console.log(this.$refs.re)
  },
  methods: {
    compWrapperOptions(name) {
      let options = {}

      options = _.merge(options, this.generateOptionsStyle(name))

      let qqUrl =
        'http://wpa.qq.com/msgrd?v=3&uin=' +
        this.modData.qq.number +
        '&site=qq&menu=yes'

      if (this.modData.qq.number == null) {
        this.modData.pic.link = ''
      } else {
        this.modData.pic.link = qqUrl
      }
      // console.log(this.$refs)
      // console.log(this)
      // // console.log(String(this.$el.innerHTML))
      // console.log(this.conf.name)

      if (!this.editMode) {
        // this.style.theme.colGroupRow = '[]'
        this.style.data.root.position = 'fixed'
        // this.style.data.root.height = '120px'
        this.style.data.colGroup.position = 'fixed'
        // this.style.data.colGroup.right = '20px'
        this.style.data.colGroup.top = '15%'
      }

      if (this.modData.styleID == '1') {
        return _.merge(
          {},
          options,
          (this.modData.pic.src = './static/adi/qq/qqTwo.svg')
        )
      } else {
        return options
      }
    }
  }
}
</script>