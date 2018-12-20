import { keepwork, lesson } from '@/api'
const { account } = keepwork
import { props } from './mutations'
import _ from 'lodash'

const {
  GET_BALANCE_SUCCESS,
  GET_TRADES_SUCCESS,
  CREATE_RECHARGE_ORDER_SUCCESS,
  GET_DISCOUNTS_SUCCESS,
  CLEAR_RECHARGE_ORDER_RECORD,
  SET_RECHARGE_ORDER_STATE,
  CREATE_TRADE_ORDER,
  SUBMIT_TRADE_ORDER,
  PAY_TRADE_ORDER
} = props

const SUCCESS_CODE = 256
const PACKAGE_TYPE = 2
const EXCHANGE_TYPE = 1

const actions = {
  async getBalance({ commit }) {
    const balance = await account.getBalance()
    commit(GET_BALANCE_SUCCESS, balance)
  },
  async getTrades({ commit }) {
    const trades = await account.getTrades()
    commit(GET_TRADES_SUCCESS, trades)
  },
  async getDiscounts({ commit }) {
    const discounts = await account.getDiscounts()
    commit(GET_DISCOUNTS_SUCCESS, discounts)
  },
  async createRechargeOrder({ commit }, payload) {
    const order = await account.createRechargeOrder(payload)
    commit(CREATE_RECHARGE_ORDER_SUCCESS, order)
    return order
  },
  async clearRechargeOrderRecord({ commit }) {
    commit(CLEAR_RECHARGE_ORDER_RECORD)
  },
  async getRechargeOrderState({ commit }, payload) {
    const order = await account.getRechargeOrderState(payload)
    if (order.state === SUCCESS_CODE) {
      commit(SET_RECHARGE_ORDER_STATE, SUCCESS_CODE)
    }
    return order
  },
  async createTradeOrder({ commit }, payload) {
    const { type, goodsId } = payload
    if (type === PACKAGE_TYPE) {
      const goodsDetail = await lesson.packages.packageDetail({ packageId: goodsId })
      commit(CREATE_TRADE_ORDER, { ...payload, goodsDetail })
      return
    }
    if (type === EXCHANGE_TYPE) {
      console.warn('exchange ------------->')
    }
  },
  async submitTradeOrder({ commit }, payload) {
    console.warn('submitTradeOrder', payload)
    commit(SUBMIT_TRADE_ORDER, payload)
  },
  async payTradeOrder({ commit }, payload) {
    console.log('完成订单')
    commit(PAY_TRADE_ORDER, payload)
  }
}

export default actions
