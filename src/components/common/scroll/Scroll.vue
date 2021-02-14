<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    //创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, // 控制div能否点击
      probeType: this.probeType,
      useTransition: false, // 解决图片过度显示蒙版
      pullUpLoad: this.pullUpLoad // 上拉加载显示更多
    })

    // 监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        // console.log(position)
        this.$emit('scrollBackTop', position)
      })
    }

    // 监听滚动显示上拉加载
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载')
        // 将这个方法暴露给 home
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      console.log(this.scroll)
      this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      // console.log('ssss')
      this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    // 获取当前滚动到的位置
    getScrollTop() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
