<template>
  <div class="outer">
      <ul class="left">
          <li>导航目录</li>
          <li v-for="(val,ind) in nav_list" :key="ind" @click="handleClick(ind)" :class="{selectedStyle: first_level===ind}">{{val.name}}</li>
          <li class="more-box">
            <div v-for="i in 3" :key="i" class="jumping-dot"/>
          </li>
      </ul>
      <div class="right">
          <div v-for="(v,i) in secondDir" :key="i" @click="handleJump(v.link)">
              <span>{{titles[v.link]}}</span>
              <span class="tail-date">{{v.date}}</span>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import { nav_list,titles } from '../md/meta'
const first_level=ref<number>(0)
const router=useRouter()
const secondDir=computed(()=>
    nav_list[first_level.value].secDir
)
const handleClick=(dirName:number)=>{
    first_level.value=dirName
}
const handleJump=(des:string)=>{
    router.push('/post/'+des)
}
</script>

<style scoped lang="scss">
.outer{
    display: flex;
    width: 800px;
    margin: auto;
}
$left-occupy: 35%;
.left {
    width: $left-occupy;
    border: 1px solid rgb(236, 236, 236);
}
.right {
    width: calc(100% - $left-occupy);
    border: 1px solid rgb(236, 236, 236);
    min-height: 400px;//同时会决定左边的空间
    padding: 40px;
    line-height: 50px;
    div {
        user-select: none;
        cursor: pointer;
        border: 1px solid gray;
        border-radius: 10px;
        padding-left: 1em;
        padding-right: 1em;
        margin-bottom: 10px;
        background: linear-gradient(
            to right,
            lightgray,
            white,
            white,
        );
        background-size: 200%;
        transition: background-position .4s;
        background-position: 80%;
        &:hover{
            background-position: 0%;
        }
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        span.tail-date{
            font-size: 0.8em;
        }
    }
}
ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    overflow: hidden;
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
    &:not(:nth-child(1)):not(:nth-last-child(1)){
        cursor: pointer;
        &:hover::after{
            content: '←';
        }
    }
    &:nth-child(1){
        text-align: center;
        height: calc($hei*1.5);
        line-height: calc($hei*1.5);
        text-decoration: initial;
    }
    &:nth-last-child(1){
        flex-grow: 1;
    }
    &:not([class='more-box']):nth-child(2n){
        background-color: rgb(236, 236, 236);
    }

    transition: text-indent .8s;
    text-indent: 0em;
    &.selectedStyle{
        text-indent: 1em;
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