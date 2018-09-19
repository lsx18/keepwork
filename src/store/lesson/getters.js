import _ from 'lodash'

const getters = {
  userinfo: state => state.userinfo,
  learnDayCount: (state, { userinfo }) =>
    _.get(userinfo, 'extra.learn.learnDayCount', 1),
  userId: (state, { userinfo }) => _.get(userinfo, 'id', ''),
  lockCoin: (state, { userinfo }) => _.get(userinfo, 'lockCoin', 0),
  packageDetail: state => ({ packageId }) =>
    _.get(state.packagesDetail, packageId),
  lessonDetail: state => ({ lessonId }) => _.get(state.lessonsDetail, lessonId),
  skills: state => state.skills,
  subjects: state => state.subjects,
  isShowLoginDialog: state => state.isShowLoginDialog
}

export default getters
