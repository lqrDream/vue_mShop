<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <main-tab></main-tab>
  </div>
</template>

<script>
import MainTab from "components/content/mainTabBar/MainTab";

export default {
  name: 'App',
  components: {
    MainTab
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
