<script setup lang="ts">
import { onMounted } from "vue"
import { onBeforeRouteUpdate, RouteLocationNormalized, useRoute, useRouter } from "vue-router"
import NotFound from '../views/NotFound.vue'

const route=useRoute()
const router=useRouter()

let savedPost:string[]|undefined=undefined
onBeforeRouteUpdate((to)=>{
    console.log('enter hook')
    if(typeof to.params['postId']==='string' && to.params['postId']!=='')
        return false
    const title=to.params['postId'] || ['index']
    if(savedPost!==undefined && title.join('/')===savedPost.join('/'))
        return true
    router.addRoute('pathView',{
        path: '',
        name: 'post',
        component: ()=>import(`../md/${title.join('/')}.md`).catch(()=>NotFound)
    })
    console.log('page reload')
    savedPost=title.concat()//深拷贝
    return (title.length==1 && title[0]==='index')?'/post/':to.path
})

onMounted(()=>{
    if(savedPost===undefined)
        router.replace(route.fullPath+'#temp')
        //触发一次update
})
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