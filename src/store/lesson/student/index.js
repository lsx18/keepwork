import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = () => ({
  packagesDetail: {},
  lessonData: {},
  lessonDetail: {},
  lessonQuiz: {},
  userSubscribeList: [],
  userSkillsList: [],
  enterClassInfo: [],
  enterClassId: Number
})

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}