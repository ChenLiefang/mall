<template>
  <div class="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav" />
    <!-- 属性：topImages  传入值 top-images -->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shopInfo"/>
    <detail-goods-info :detail-info="detailInfo"  @detailImageLoad="detailImageLoad"/> 
    <detail-param-info ref="param" :param-info="paramInfo"/>
    <detail-comment-info  ref="comment" :comment-info="commentInfo"/>
    <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top  @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-botton-bar @addCart="addToCart"></detail-botton-bar>
  </div>
</template>

<script>



import DetailNavBar from './childComps/DetailNavBar.vue' 

import {getDetail,Goods,getRecommend} from  '../../network/detail'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
// import {itemListerMixin} from 'common/mixin'
import { debounce } from '../../common/utils'
import DetailBottonBar from './childComps/DetailBottonBar.vue'
import {itemListerMixin,backTopMixin} from '../../common/mixin'
// import BackTop from '../../components/content/backtop/BackTop.vue';
export default {
  name:'Detail',
  components: { 
    DetailNavBar, 
    DetailSwiper, 
    DetailBaseInfo, 
    Scroll, 
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottonBar,
    // BackTop,
    },
 mixins:[itemListerMixin,backTopMixin],

  data(){
    return {
      iid:null ,
      topImages:[],
      goods:{},
      shopInfo:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
      // isShowBackTop:false,
     
    }
  },
  methods:{
    detailImageLoad(){
      this.refresh()
      this.getThemeTopY()
      
    },
    //  backClick(){
    //     this.$refs.scroll.scrollTo(0,0,300)
    //     // console.log(this.$refs.scroll.scrollTo)
    //   },
    titleClick(index){
      // console.log(index)
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)

       
    },
    contentScroll(position){
      //1.获取y值
      const positionY = -position.y
      //2.positionY 和主题中的值themeTopYs进行对比
      //[0,7839,9120,9476]
      //positionY 在0 -7389直接 index = 0 以此类推
        let length = this.themeTopYs.length
      for(let i= 0 ;i< length ;i++){
        if(this.currentIndex !== i && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
          this.currentIndex = i
          
           this.$refs.nav.currentIndex = this.currentIndex
        }
        
        // if(this.currentIndex !== i &&((i< length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
        // ||(i=== length - 1 && positionY >= this.themeTopYs[i]))){
        //   this.currentIndex = i
        //   console.log(this.currentIndex)
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }

        //3.是否回到顶部
          //判断backtop是否显示
      //  this.isShowBackTop = (- position.y )> 1000
        this.listenShowBackTop(position)
      }
     

    },
    addToCart(){
      //1. 获取购物车需要展示的信息 图片 标题 描述  价格 数量 
      const product ={}
      product.image = this.topImages[0]
      product.title = this.goods.tltle
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      //2. 将商品添加到购物车
      this.$store.dispatch('addCart',product).then(res=>{
        this.$toast.show(res)
        console.log(res)
      })

      
    }

  }, 

  mounted(){
  //  console.log('mounter')
  },
  destroyed(){
     this.$bus.$off('itemImageLoad',this.itemImgLister)

  },
  created(){
    //1.创建以后拿到 iid 并且保存传入的iid
    this.iid = this.$route.params.iid;
    //2. 根据iid请求详情数据
    getDetail(this.iid).then(res=>{
      console.log(res)
      const data = res.result
      //获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages
      //创建商品的对象
      this.goods= new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //取出店铺信息
      this.shopInfo = data.shopInfo
      // console.log(data.shopInfo)
      //取出商品详情页信息
      this.detailInfo  = data.detailInfo
      //取出参数信息
      this.paramInfo = data.itemParams
      //取出评论的信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
      // //值不对的原因$refs.param.$el.offsetTop 没有渲染
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs)

      // this.$nextTick(()=>{
      //   //根据最新的数据，对应的dom是已经被渲染出来的
      //   //但是图片依旧没有加载完成（获取的offsetTop不包含图片）
      //    this.themeTopYs = []
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs)

      // })

    })

    //3 请求推荐数据
    getRecommend().then(res=>{
      this.recommends = res.data.list
    
    })
    //4.给getThemeTopY赋值
    this.getThemeTopY  = debounce(()=>{
      this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs)
    },1000)
    
  },
 
}
</script>

<style scoped>
.detail{
  height: 100vh;
  background-color: #fff;
  position: relative;
  z-index: 1;

}
.content{
  background-color: #fff;
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>