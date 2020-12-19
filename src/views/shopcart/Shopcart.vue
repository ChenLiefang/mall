<template>
  
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bar></cart-bar>
  </div>
</template>
<script>
import NavBar from '../../components/common/navbar/NavBar.vue';
import {mapGetters} from 'vuex'
import CartList from './childComps/CartList.vue';
import CartBar from './childComps/CartBar.vue';




export default {
  components: { NavBar, CartList, CartBar, },
  name: "Shopcart",
  computed:{
    ...mapGetters(['cartLength'])
  }

};
</script>

<style scoped>

.nav-bar{
  background-color:var(--color-tint);
  color: #fff;
}
</style>
