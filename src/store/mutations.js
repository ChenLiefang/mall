import {ADD_COUNTER,ADD_TO_CART} from './mutations-types'
export default {
 //mutations目的是修改state中的状态 每个方法尽可能完成的单一一点
  [ADD_COUNTER](state, payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.checked = true
    state.cartList.push(payload)
  }
}