<template>
    <div class="cart-list">
      <scroll class="content" ref="scroll">
        <cart-list-item v-for="(item) in cartList" 
        :key="item.iid"  :item-info="item"/>
      </scroll>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Scroll from '../../../components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem.vue'



export default {
  components: { Scroll, CartListItem },
   name:'CartList', 
   computed:{
     ...mapGetters(['cartList'])
   },
   activated() {
     this.$refs.scroll.refresh()
   }
}
</script>
<style  scoped>
.cart-list{
  height: 100vh;
   position: relative;
}
.content{
  height:calc(100% -  143px);
  overflow: hidden;
}
</style>
