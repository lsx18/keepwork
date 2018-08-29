<template>
  <div class='comp-media' style="height: 97px">
    <div v-for="(item, index) in forImgs" :key="index" v-if="item.img && item.img.length != 0">
      <a :target='target' :href='item.link'>
        <div :class="getImgClass" v-if='isImage'>
          <div class="imgs" :style="loadImg(item)"></div>
        </div>
        <video v-else-if='isVideo' :src='src'></video>
        <div class="svg" v-if="isBase64Svg" v-html="svg" :style="svgFill"></div>
      </a>
    </div>
  </div>
</template>

<script>
import Media from './media.types'
import compBaseMixin from '../comp.base.mixin'
import { Base64 } from 'js-base64'
import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset())

export default {
  name: 'AdiMedia',
  mixins: [compBaseMixin],
  computed: {
    forImgs() {
      return this.properties.data.length == 0
        ? this.options.data
        : this.properties.data
    },
    svg() {
      if (this.isBase64Svg) {
        let base64Svg = this.src.split(',')[1] ? this.src.split(',')[1] : ''

        return Base64.decode(base64Svg)
      }
    },
    isImage() {
      return Media.isImage(this.src)
    },
    isVideo() {
      return Media.isVideo(this.src)
    },
    isBase64Svg() {
      return Media.isBase64Svg(this.src)
    },
    target() {
      return this.properties.target
        ? this.properties.target
        : this.options.emptyTarget
    },
    link() {
      return this.properties.link
        ? this.properties.link
        : this.options.emptyLink
    },
    getImgClass() {
      let imgClassName = 'comp-media-img'
      let style = {
        [imgClassName]: {
          'height': this.options.img && this.parsePx(this.options.img.defaultWebHeight),
          'width': this.properties.webWidth || this.options.img && this.parsePx(this.options.img.defaultWebWidth),
          'margin-top': this.options.space && this.parsePx(this.options.space.webMarginTop),
          'margin-bottom': this.options.space && this.parsePx(this.options.space.webMarginBottom),
          'padding-top': this.options.space && this.parsePx(this.options.space.webPaddingTop),
          'padding-bottom': this.options.space && this.parsePx(this.options.space.webPaddingBottom)
        },
        '@media only screen and (max-width: 767px)': {
          [imgClassName]: {
            'height': this.options.img && this.parsePx(this.options.img.defaultMobileHeight),
            'width': this.properties.webWidth || this.options.img && this.parsePx(this.options.img.defaultMobileWidth),
            'margin-top': this.options.space && this.parsePx(this.options.space.mobileMarginTop),
            'margin-bottom': this.options.space && this.parsePx(this.options.space.mobileMarginBottom),
            'padding-top': this.options.space && this.parsePx(this.options.space.mobilePaddingTop),
            'padding-bottom': this.options.space && this.parsePx(this.options.space.mobilePaddingBottom)
          }
        }
      }

      if(!this.sheet) {
        this.sheet = jss.createStyleSheet(style)
        this.sheet.attach()
      }

      return 'img ' + this.sheet.classes[imgClassName]
    },
    svgFill() {
      return this.generateStyleString({
        fill: this.options.svgFillColor
      })
    }
  },
  methods: {
    loadImg(item) {
      return this.generateStyleString({
        'background-image': 'url(' + item.img + ')'
      })
    },
    parsePx(value) {
      if(value) {
        return parseInt(value) + 'px!important'
      } else {
        return 'auto!important'
      }
    },
  }
}
</script>

<style lang="scss">
.comp-media {
  .svg {
    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<style lang="scss" scoped>
.comp-media {
  width: 100%;
  height: 100%;
  a {
    .img {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;

      .imgs {
        width: 100%;
        height: 100%;
        background-position: center;
        background-size: cover;
      }
    }
  }
}
</style>
