<script setup lang="ts">
import { useRoute } from "vue-router"
const route=useRoute()
</script>
<template>
    <div class="post-body">
        <router-view class="c-html-render"/>
        <div class="tail">没mò了liǎo</div>
    </div>
</template>
<style scoped>
.post-body{
    width: 90%;
    margin: auto;
    padding-bottom: 20px;
    padding-top: 1.2em;
}
.tail {
    border-bottom: 5px rgb(64,70,75) solid;
    text-align: right;
    font-size: 50px;
}
</style>