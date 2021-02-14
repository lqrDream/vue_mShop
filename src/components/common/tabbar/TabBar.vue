<template>
  <div id="tab">
    <slot></slot>
  </div>
</template>

<script>
  import TabBarItem from "./TabBarItem";
  export default {
    name: "TabBar",
    components:{
      TabBarItem
    }
  }
</script>

<style scoped>
  #tab{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f9f9f9;
    height: 49px;
    box-shadow: 0 -3px 3px rgba(100,100,100,0.08);
    display: flex;
    z-index: 22;
  }

</style>