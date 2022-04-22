<script setup lang="ts">
</script>

<template>
  <router-view/>
</template>
<style lang="scss">
html,body,#app {
  height: 100%;
  margin: 0;
  scroll-behavior: smooth;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.c-html-render{
  //task-list:
  li.task-list-item {
    list-style:none;
  }
  pre {
    overflow: scroll scroll;
  }
}
</style>