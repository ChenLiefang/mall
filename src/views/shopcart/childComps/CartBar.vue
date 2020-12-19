<template>
    <div class="bottom-bar">
      <div class="check-content">
      <check-button class="check-button"
       :is-checked="isSelectedAll"
       @click.native="checkClick"/>
      <span>全选</span>
      </div>
      <div class="totalPrice">
        合计：{{totalPrice}}
      </div>
      <div class="calaulate" @click="calcClick">去计算{{checkedLength}}

      </div>
    </div>
</template>
<script>
import CheckButton from '../../../components/content/checkButton/CheckButton.vue'
export default {
  components: { CheckButton },
   name:'CartBar',
   computed:{
     totalPrice(){
       return '￥'+  this.$store.state.cartList.filter(item=>{
         return item.checked}).reduce((preValue,item)=>{
           return preValue + item.price * item.count
         },0).toFixed(2)
     },
     checkedLength(){
       return this.$store.state.cartList.filter(item =>item.checked).length
     },
     isSelectedAll(){
       //不被选中的情况下
      //  return !(this.$store.state.cartList.filter(item=> !item.checked).length)
      if(this.$store.state.cartList.length === 0) return false
     return !(this.$store.state.cartList.find(item => !item.checked)) 
     }
   },
   methods:{
     checkClick(){
      //如果原来都是选中的，则全部不选中
      //原来某些不选中，全部选中
      if(this.isSelectedAll){
        this.$store.state.cartList.forEach(item=>{
          item.checked = false
        })
      }else{
         this.$store.state.cartList.forEach(item=>{
          item.checked = true
        })
      }
     },
     calcClick(){
       if(!this.isSelectedAll){
         this.$toast.show('请选择购买的商品')
       }
     }
   }
}
</script>
<style  scoped>
.bottom-bar{
  background-color:rgb(223, 215, 215);
  /* height: 40px; */
  bottom:140px;
  position: relative;
  display: flex;
 
}
.check-content{
  flex:1;
  width: 20%;
  position: relative;
  top:10px;
  display: flex;
}
.check-button{
  
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.calaulate{
  width: 30%;
  background-color: rgb(230, 70, 70);
   text-align: center;
   line-height: 40px;
   color:#fff
}
.totalPrice{
  width: 50%;
   position: relative;
  top:10px;
  padding-left: 5px;
}

</style>
