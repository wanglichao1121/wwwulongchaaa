<script setup lang="ts">
import { onBeforeRouteUpdate, RouteLocationNormalized, useRoute, useRouter } from "vue-router"
import {updatePost} from '../router'
const route=useRoute()
const router=useRouter()
onBeforeRouteUpdate(updatePost)
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
    border-bottom: 2px rgb(64,70,75) solid;
    text-align: right;
    font-size: 30px;
}
</style>