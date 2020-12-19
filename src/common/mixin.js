import {debounce} from './utils'
import BackTop from 'components/content/backtop/BackTop.vue';
export const itemListerMixin ={
  data(){
    return {
      itemImgLister:null,
      refresh:null
    }
  },
  
  mounted(){
    //refs不能写在created里面
    //这个地方的img标签确实被挂载，但是其中的图片还没有占据高度
    //this.$refs.scroll.refresh对这个函数进行防抖操作
    //1.图片加载完成事件的监听
    this.refresh = debounce(this.$refs.scroll.refresh,200)
    //对监听事件进行保存
    this.itemImgLister = ()=>{
     this.refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgLister)
  }
}


// 回到顶部的抽取
export const backTopMixin = {
  components:{
    BackTop,
  },
  data(){
    return{
      isShowBackTop:false,
    }
  },
  methods: {
    //点击回到顶部
    backClick(){
      this.$refs.scroll.scrollTo(0,0,300)
      // console.log(this.$refs.scroll.scrollTo)
    },
    listenShowBackTop(position){
      this.isShowBackTop = -position.y > 1000
    }
    
  },
}