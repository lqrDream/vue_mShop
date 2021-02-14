<template>
  <div class="tab-control">
    <div v-for="(item,index) of title"
         class="tab-control-item"
         :class="{active:index === currentIndex}"
         @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    title: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods:{
    itemClick(id){
      this.currentIndex = id
      // console.log(id)
      this.$emit('tabClick',id)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 4px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>
