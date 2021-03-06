import _ from 'lodash'
import jss from 'jss'
import preset from 'jss-preset-default'
import { mapGetters } from 'vuex'
import CompWrapper from './CompWrapper'

jss.setup(preset())

const renderTemplate = (h, m) => {
  let components = m.conf.properties.components

  return (
    <div class={m.modClasses()}>
      {_.map(components, (_, key) => {
        return (
          <CompWrapper
            mod={m.mod}
            property={key}
            classes={m.compWrapperClass(key)}
            editMode={m.editMode}
            options={m.compWrapperOptions(key)}
          />
        )
      })}
    </div>
  )
}

export default {
  props: {
    mod: Object,
    conf: Object,
    theme: Object,
    editMode: Boolean
  },
  render(h) {
    if (this.sheet) this.sheet.detach()
    this.style = this.conf.styles[this.mod.styleID]
    this.sheet = jss.createStyleSheet(this.style.data)
    this.sheet.attach()
    return renderTemplate(h, this)
  },
  methods: {
    isChildActive(property) {
      return (
        this.editMode && this.mod.isActive && property === this.activeProperty
      )
    },
    jssClass(name) {
      return this.sheet.classes[name]
    },
    themeClass(name) {
      if (this.theme) return this.theme.sheet.classes[name]
    },
    themeData(name) {
      if (this.theme) return this.theme.data[name]
    },
    compWrapperClass(name) {
      let classes = []
      if (this.isChildActive(name)) classes.push('comp-active')
      if (this.jssClass(name)) classes.push(this.jssClass(name))
      if (this.style.theme && this.style.theme[name]) {
        this.style.theme[name].forEach(el => classes.push(this.themeClass(el)))
      }
      return classes
    },
    modClasses() {
      let classes = []
      let name = 'root'
      if (this.jssClass(name)) classes.push(this.jssClass(name))
      if (this.style.theme && this.style.theme[name]) {
        this.style.theme[name].forEach(el => classes.push(this.themeClass(el)))
      }
      return classes
    },
    compWrapperOptions(name) {
      let options = {}

      if (this.style.options) {
        if (this.style.options.config[name]) {
          options = _.cloneDeep(this.style.options.config[name])
        }
        if (this.style.options.theme[name]) {
          _.forEach(this.style.options.theme[name], (op, key) => {
            // 如果定义了相同的theme key，则之前的配置会被覆盖
            options[key] = this.themeData(op)
          })
        }
      }
      return options
    }
  },
  computed: {
    ...mapGetters({
      activeProperty: 'activeProperty'
    })
  }
}
