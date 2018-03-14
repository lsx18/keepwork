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
    style() {},
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