<template>
  <div class="tab-item" @click="getPath">
    <div v-if="!isActive" class="item-icon">
      <slot name="item-icon"></slot>
    </div>
    <div  v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="isActiveColor">
      <slot name="item-text"></slot>
    </div>
  </div>

</template>

<script>

  export default {
    name: "TabBarItem",
    data() {
      return {
        // isActive:true
      }
    },
    props: {
      path: String,
      activeColor:{
        type:String,
        default:'red'
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      isActiveColor(){
        return this.isActive ? {color:this.activeColor} : ''
      }
    },
    methods: {
      getPath() {
        // console.log(this.$route)
        this.$router.replace(this.path).catch(err=>err)
      }
    }
  }
</script>

<style scoped>
  .tab-item {
    height: 100%;
    flex: 1;
    text-align: center;
  }

  .tab-item img {
    display: inline-block;
    padding: 3px 0 3px 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    vertical-align: middle;
  }

</style>