import {ADD_COUNTER,ADD_TO_CART} from './mutations-types'

export default {
  
//异步操作 判断逻辑
  addCart(context ,payload){
    return new Promise((resolve,reject)=>{
      //payload 新添加的商品
      //查找之前数组中是否有该商品
      let oldProduct =context.state.cartList.find(item=> item.iid === payload.iid)
      //2.判断oldProduct
      if(oldProduct){
        // let oldProduct = state.cartList[index]
        // oldProduct.count += 1
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前商品数量+1')
      }else{
        payload.count = 1
        context.commit(ADD_TO_CART,payload)
        // context.state.cartList.push(payload)
        resolve('添加了新的商品')
      }
    })
  }
}