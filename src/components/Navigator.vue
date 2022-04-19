<template>
  <div class="outer">
      <ul class="left">
          <li v-for="(val,ind) in nav_list" :key="ind">{{ind}}</li>
          <li class="more-box">
            <div v-for="i in 3" :key="i" class="jumping-dot"/>
          </li>
      </ul>
      <div class="right">
          
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const first_level=ref<string>('导航目录')
const nav_list=({
    '导航目录': {},
    '📦关于博客': {
        '关于欢迎页': '/post/blogitself/welcomepage',
        '关于post': '/post/blogitself/post'
    },
    '💻安全相关': {
        '一些pwn的题': '/post/security/pwn',
    },
    '🎮游戏相关': {
    }
})
</script>

<style scoped lang="scss">
.outer{
    display: flex;
    width: 800px;
    margin: auto;
}
$left-occupy: 30%;
.left {
    width: $left-occupy;
    border: 1px solid rgb(236, 236, 236);
}
.right {
    width: calc(100% - $left-occupy);
    border: 1px solid rgb(236, 236, 236);
    min-height: 400px;//同时会决定左边的空间
}
ul {
    display: flex;
    flex-direction: column;
    margin: 0;
}
li {
    list-style:none;
    $hei: 40px;
    font-size: calc($hei/2);
    height: $hei;
    line-height: $hei;
    padding-left: 2em;
    padding-right: 2em;
    user-select: none;
    &:nth-child(1){
        text-align: center;
        height: calc($hei*1.5);
        line-height: calc($hei*1.5);
    }
    &:nth-last-child(1){
        flex-grow: 1;
    }
    &:not([class='more-box']):nth-child(2n){
        background-color: rgb(236, 236, 236);
    }
}
.more-box {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.jumping-dot {
    align-self: center;
    $size: 20px;
    background-color: rgb(177, 173, 173);
    height: $size;
    width: $size;
    border-radius: calc($size/2);
    animation: bounce;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    @for $i from 1 through 3 {
        &:nth-child(#{$i}){
            animation-delay: calc($i*0.5s);
        }
    }
}
</style>