<template>
  <div class="comp-button">
    <a :href='source.link'>
      <button> {{source.text}} </button>
    </a>
  </div>
</template>

<script>
import compBaseMixin from '../comp.base.mixin'
export default {
  name: 'AdiButton',
  mixins: [compBaseMixin]
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