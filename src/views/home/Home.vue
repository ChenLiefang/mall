<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div> </nav-bar>
    <tab-control  
      :titles="['流行','新款','精选']" 
      @tabClick="tabClick"  ref="tabControl1" 
      class="tab-control" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
     @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control 
      :titles="['流行','新款','精选']" 
      @tabClick="tabClick"  ref="tabControl2" 
      />
      
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top  @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
  
</template>
<script> 
import {debounce} from '../../common/utils'
import NavBar from '../../components/common/navbar/NavBar.vue';
import HomeSwiper from './childComps/HomeSwiper.vue';
import {getHomeMultidata,getHomeGoods} from '../../network/home.js'
import HomeRecommendView from './childComps/HomeRecommendView.vue';
import HomeFeatureView from './childComps/HomeFeatureView.vue';

import TabControl from '../../components/content/TabControl.vue';
import GoodsList from '../../components/content/goods/GoodsList.vue';
import Scroll from '../../components/common/scroll/Scroll.vue';
// import BackTop from '../../components/content/backtop/BackTop.vue';
import {itemListerMixin,backTopMixin} from '../../common/mixin'


export default {
  name: "Home",
  components: {
     NavBar,
     HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
     GoodsList,
    Scroll,
    // BackTop,
      },
  mixins:[itemListerMixin,backTopMixin],
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      // isShowBackTop:false,
      tabOffSetTop: 0,
      isTabFixed: false,
      saveY:0,
      itemImgLister:null 
    }
  },

  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }

  },
  destroyed() {
    console.log('home destroyed')
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY,0)

  },
  deactivated(){
    //保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    console.log(this.saveY)
    //取消全局事件的监听$off（事件总线监听的数据，要取消的函数）
    this.$bus.$off('itemImageLoad',this.itemImgLister)
  },
  methods:{

      tabClick(index){
        // console.log(index)
        switch(index){
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;

      },
      // backClick(){
      //   this.$refs.scroll.scrollTo(0,0,300)
      //   // console.log(this.$refs.scroll.scrollTo)
      // },
      contentScroll(position){
        //判断backtop是否显示
        this.listenShowBackTop(position)
      //  this.isShowBackTop = (- position.y )> 1000
       // 2决定 tabControl是否吸顶(position:fixed)
       this.isTabFixed = (- position.y ) > this.tabOffSetTop

      },
      loadMore(){
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.scroll.refresh()
        // console.log('上拉加载更多')
      },
      swiperImageLoad(){
        this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop
        // console.log(this.$refs.tabControl.$el.offsetTop)
      },
            //  网络请求相关的方法
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
        // console.log(res)
        // this.result = res
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        //动态获取页  page
        const page = this.goods[type].page + 1 
         getHomeGoods(type,page).then(res=>{
            // console.log(res)
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1 
        //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
      })
      }
    },
  //生命周期函数
  created(){
    //请求多个数据
    this.getHomeMultidata()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  
  },
  mounted(){
   this.tabClick(0)
  },
};
</script>

<style scoped>
#home{
  /* padding-top: 44px; */
    height: 100vh;
    position: relative;

}
.home-nav{
  background-color: var(--color-tint);
  color: aliceblue;

  /* 原生滚动 */
  /* position: fixed; */
  /* left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control{
  position: relative;
  /* top:44px; */
  /* z-index: 9; */

}
/* .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  } */
  .content {
    height: calc(100% - 93px);
    overflow: hidden;
    /* margin-top: 44px; */
  }


</style>
