<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :title="['流行','新款','精选']"
      @tabClick="goodsListType($event)"
      ref="tabControl1"
      v-show="isTabControlShow"
      class="tab-control"
    >
    </tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scrollBackTop="scrollBackTop"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!--    轮播图组件-->
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommends-view :recommend="recommend"></home-recommends-view>
      <home-feature-view></home-feature-view>
      <tab-control
        :title="['流行','新款','精选']"
        @tabClick="goodsListType($event)"
        ref="tabControl2">
      </tab-control>
      <goods :goods="goodsType"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <!--    轮播图-->
    <!--    <div class="home_banner">-->
    <!--      <swiper :options="swiperOptions" class="clearfix">-->
    <!--        <swiper-slide v-for="item of banner" :key="item.title" class="home_banner_item">-->
    <!--          <a :href="item.link">-->
    <!--            <img :src="item.image" alt="">-->
    <!--          </a>-->
    <!--        </swiper-slide>-->
    <!--        <div class="swiper-pagination" slot="pagination"></div>-->
    <!--      </swiper>-->
    <!--    </div>-->

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import Goods from "components/content/goods/Goods";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import HomeSwiper from "./childCom/HomeSwiper";
import HomeRecommendsView from "./childCom/HomeRecommendsView";
import HomeFeatureView from "./childCom/HomeFeatureView";
// 使用export default 导出才不需要大括号
import {getHomeMultidata, getHomeGoods} from "network/home";
import {debounce} from "@/common/until";

export default {
  name: "Home",
  components: {
    BackTop,
    TabControl,
    NavBar,
    HomeFeatureView,
    HomeSwiper,
    HomeRecommendsView,
    Goods,
    Scroll
  },
  data() {
    return {
      banner: [],
      dKeyword: [],
      keywords: [],
      recommend: [],
      // swiperOptions: {
      //   pagination: {
      //     el:'.swiper-pagination',
      //   },
      //   loop: true,
      //   autoplay:2000
      // }
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      isTabControlTop:0,
      isTabControlShow:false,
      isSaveY:0
    }
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata()
    // 获取流行主体数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh, 300)
    // 接收goodsItem里面图片加载完成的函数
    this.$bus.$on('goodsImgItemLoad', () => {
      // console.log('goodsImgItemLoad')
      // 当图片加载完了就刷新scroll
      refresh()
    })
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 这个必须设置，不设置只能刷新一次
        this.$refs.scroll.finishPullUp()
      })


    },
    // 根据点击的id 选择数据传入点击的类型， 并且渲染当前类型
    goodsListType(id) {
      // console.log(id)
      switch (id) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      // 解决两个tabControl的选中不一样的问题
      this.$refs.tabControl1.currentIndex = id
      this.$refs.tabControl2.currentIndex = id
    },
    // 点击放回顶部，进行返回
    backClick() {
      // console.log('aaa')
      // this.$refs.scroll.scroll.scrollTo(0,0,300)
      // console.log(this.$refs.scroll)
      // console.log(this.$refs.scroll.scroll)
      this.$refs.scroll.scrollTo(0, 0, 1000)
    },
    // 根据滚动子组件传递过来的滚动位置 ，对backTop进行显示和隐藏
    scrollBackTop(position) {
      // 监听返回顶部滚动
      this.isShowBackTop = Math.abs(position.y) > 1000

      // // 监听tabControl组件的滚动
      // console.log('aaa',this.isTabControlTop)
      this.isTabControlShow = (-position.y) > this.isTabControlTop
      // console.log(this.isTabControlShow)
    },
    // 上拉加载更多
    loadMore() {
      // console.log('上拉加载更多')
      // console.log(this.currentType)
      this.getHomeGoods(this.currentType)
    },
    // 这是轮播图swiper图片组件 加在完了发过来的事件
    swiperImageLoad(){
      // console.log('aas')
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.isTabControlTop = this.$refs.tabControl2.$el.offsetTop
    }
  },
  computed: {
    // 计算传入的类型根据类型 进行传值给子组件
    goodsType() {
      return this.goods[this.currentType].list
    }
  },
  activated() {
    // console.log('activated')
  //  进入的时候移动到上一次离开时保存的位置
    this.$refs.scroll.scrollTo(0,this.isSaveY,0)
    // 最好刷新一下，不然有时候会返回到顶部，或者出现不能滚动的情况
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // console.log('deactivated')
    // 离开当前组件的时候保存当前滚动的位置
    this.isSaveY = this.$refs.scroll.getScrollTop()
  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #f9f9f9;
  /*position: fixed;*/
  /*left: 0;*/
  /*top: 0;*/
  /*right: 0;*/
  /*z-index: 9;*/
}

.home_banner {
  width: 100%;
  height: 300px;
}

.home_banner_item {
  width: 100%;
}

.home_banner_item img {
  width: 100%;
}

/*.tab-control {*/
/*  position: sticky;*/
/*  top: 44px;*/
/*  background-color: #ffffff;*/
/*  z-index: 9;*/
/*}*/

.tab-control {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  top: -1px;
}

.content {
  /*height: 400px;*/
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
