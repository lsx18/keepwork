import _ from 'lodash'

let emptyData = {
  pic: {
    emptySrc: require('@/../static/adi/qq/qqOne.svg'),
    emptyLink: 'http://keepwork.com',
    emptyTarget: '_blank'
  },
  desc: {
    emptyName: 'adi.qq.desc',
    emptyLink: 'http://keepwork.com',
    emptyTarget: '_blank'
  }
}

export default [
  // style 0 上图下文
  {
    data: {
      root: {
        'z-index': '3',
        position: 'relative'
        // height: '120px'
      },
      colGroup: {
        position: 'relative',
        right: '0',
        top: 'unset',
        'padding-top': '15px',
        'padding-right': '20px',
        'padding-bottom': '15px'
      },
      // '@media only screen and (max-width: 767px)': {
      //   colGroup: {
      //     'padding-right': '20px'
      //   }
      // },
      colPic: {
        // 'min-width': '70px',
        // width: 'auto',
        display: 'flex',
        'justify-content': 'flex-end'
      },
      pic: {
        width: '70px',
        height: '70px'
        // 'border-radius': '50%'
      },
      colDesc: {
        // width: 'auto',
        // 'min-width': '70px',
        display: 'flex',
        'justify-content': 'flex-end'
      },
      desc: {
        width: '70px',
        'text-align': 'center'
      }
    },
    props: {
      colGroup: {
        span: 24
        // xs: {
        //   span: 3,
        //   offset: 21
        // },
        // sm: {
        //   span: 2,
        //   offset: 22
        // }
      },
      colPic: { span: 24 },
      colDesc: { span: 24 }
    },
    theme: {
      root: [],
      desc: ['font_9', 'color_7']
    },
    options: {
      theme: {
        pic: {
          svgFillColor: 'color_4'
        }
      },
      config: {
        ...emptyData
      }
    },
    cover: require('@/../static/adi/qq/cover/qqCoverOne.png'),
    preview: {
      outter: {
        height: '40px'
      }
    }
  },

  // style 1 左图右文
  {
    data: {
      root: {
        'z-index': '3',
        position: 'fixed',
        height: '100px'
      },
      colGroup: {
        position: 'fixed',
        right: '40px',
        top: '15%',
        'padding-top': '15px',
        display: 'flex',
        'justify-content': 'flex-end'
      },
      colPic: {
        'min-width': '100px',
        'padding-right': '10px',
        display: 'flex',
        'justify-content': 'flex-end'
      },
      pic: {
        width: '70px',
        height: '70px',
        'border-radius': '50%'
      },
      colDesc: {
        display: 'flex',
        'min-width': '100px',
        'justify-content': 'flex-start',
        'align-items': 'flex-end',
        height: '100%'
      },
      desc: {}
    },
    props: {
      colGroup: {
        xs: {
          span: 12,
          offset: 12
        },
        sm: {
          span: 9,
          offset: 15
        }
      },
      colPic: { span: 12 },
      colDesc: { span: 12 }
    },
    theme: {
      root: [],
      desc: ['font_9', 'color_7']
    },
    options: {
      theme: {
        pic: {
          svgFillColor: 'color_7'
        }
      },
      config: {
        ...emptyData,
        desc: _.merge({}, emptyData.desc, {
          buttonStyle: {
            border: '1px solid #3ba4ff',
            'border-radius': '18px',
            padding: '4px'
          }
        })
      }
    },
    cover: require('@/../static/adi/qq/cover/qqCoverTwo.png'),
    preview: {
      outter: {
        height: '40px'
      }
    }
  }
]
