<template>
  <Swiper class="home-swiper">
    <swiper-item v-for="item in banner" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </Swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper/index'
  export default {
    name: "HomeSwiper",
    props:{
      banner:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        isImgLoad:true
      }
    },
    components:{
      SwiperItem,
      Swiper,
    },
    methods:{
      imgLoad(){
        // 当加载了一张图片，就可以tabControl组件就可以获取真实高度了
        if(this.isImgLoad){
          this.$emit('swiperImageLoad')
          this.isImgLoad = false
        }
      }
    }
  }
</script>

<style scoped>
.home-swiper img{
  vertical-align: middle;
}
</style>
