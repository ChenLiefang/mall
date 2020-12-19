<template>
  <tab-bar class="tab-bar">
    <tab-bar-item path="/home" activeColor="green">
      <template v-slot:item-icon>
        <img src="../../assets/img/tabbar/home.png" alt="" />
      </template>
      <template v-slot:item-icon-active>
        <img src="../../assets/img/tabbar/home_active.png" />
      </template>
      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="green">
      <template v-slot:item-icon>
        <img src="../../assets/img/tabbar/category.png" alt="" />
      </template>
      <template v-slot:item-icon-active>
        <img src="../../assets/img/tabbar/category_active.png" />
      </template>
      <template v-slot:item-text>
        <div>分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/shopcart" activeColor="green">
      <template v-slot:item-icon>
        <img src="../../assets/img/tabbar/shopcart.png" alt="" />
      </template>
      <template v-slot:item-icon-active>
        <img src="../../assets/img/tabbar/shopcart_active.png" />
      </template>
      <template v-slot:item-text>
        <div>购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="green">
      <template v-slot:item-icon>
        <img src="../../assets/img/tabbar/profile.png" alt="" />
      </template>
      <template v-slot:item-icon-active>
        <img src="../../assets/img/tabbar/profile_active.png" />
      </template>
      <template v-slot:item-text>
        <div>我的</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>
<script>
import TabBar from '../common/tabbar/TabBar.vue';
import TabBarItem from "../common/tabbar/TabBarItem.vue";

export default {
  name: "MainTabBar",
  components: {    
    TabBar,
    TabBarItem
   
  },
};
</script>
<style scoped>
.tab-bar{
  /* z-index: 99; */
  background-color: #fff;
}
</style>
