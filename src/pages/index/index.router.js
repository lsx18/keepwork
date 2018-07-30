import Vue from 'vue'
import Router from 'vue-router'
const PageViewer = () => import('@/components/viewer/MdPageViewer')
// import pdf from '@/components/adi/common/pdf'

Vue.use(Router)
// Vue.use(pdf)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'PageViewer',
      component: PageViewer
    },
    {
      path: '/pdf',
      name: 'PDF',
      component: () => import('@/components/adi/common/bigFile/PDF.vue')
    }
  ]
})
