<script setup lang="ts">
import { computed, watch, ref } from "vue"
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
}
.tail {
    border-bottom: 5px rgb(64,70,75) solid;
    text-align: right;
    font-size: 50px;
}
</style>