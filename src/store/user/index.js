import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = () => ({
  profile: {},
  website: {},
  contributedWebsite: {},
  siteDataSource: {},
  comments: {},
  siteDetailInfo: {},
  webTemplateConfig: [],
  siteLayoutConfigs: {},
  skyDrive: {},
  usersDetail: [],
  siteThemeConfigs: {},
  siteFiles: {},
  sendCodeInfo: {},
  authCodeInfo: {},
  threeServices: []
})

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
