<template>
  <div class="comp-button">
    <a :href='data.link'>
      <button :style="style"> {{data.text}} </button>
    </a>
  </div>
</template>

<script>
import compBaseMixin from '../comp.base.mixin'
export default {
  name: 'AdiButton',
  mixins: [compBaseMixin],
  methods: {},
  computed: {
    style() {
      return (
        'font-size:' +
        this.options.fontSize +
        ';line-height:' +
        parseInt(this.options.fontSize) / 2 +
        'px' +
        ';color:' +
        this.options.fontColor
      )
    },
    data() {
      return JSON.parse(this.source.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.comp-button {
  height: 100%;
  a {
    height: 100%;
    button {
      height: 100%;
      line-height: 20px;
    }
  }
}
</style>