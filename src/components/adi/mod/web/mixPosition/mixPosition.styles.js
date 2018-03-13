export default [
  // style 1
  {
    data: {
      // 定义mod根div的样式
      root: {
        position: 'relative',
        height: '200px'
      },
      button: {
        height: '40px',
        width: '80px',
        'padding-left': '20px',
        'padding-right': '20px',
        'padding-top': '30px',
        'padding-bottom': '30px',
        position: 'absolute',
        top: 0,
        left: 0
      }
    },
    theme: {
      root: ['font_0', 'color_7']
    },
    options: {
      theme: {
        button: {
          fontSize: 'font_2',
          fontColor: 'color_7',
          'background-color': 'color_1'
        }
      },
      config: {}
    }
  }
]
