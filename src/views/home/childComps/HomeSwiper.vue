<template>
  <div>
     <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index" >
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad"/>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import {Swiper,SwiperItem} from '../../../components/common/swiper/index.js'
export default {
  name:'HomeSwiper',
  data(){
    return {
      isLoad:false
    }

  },
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }

  },
  methods:{
    imageLoad(){
      if(this.isLoad)
      this.$emit('swiperImageLoad')
      this.isLoad = true
    }

  },
  components: { 
     Swiper,
     SwiperItem,
  },

}
</script>
<style scoped>

</style>