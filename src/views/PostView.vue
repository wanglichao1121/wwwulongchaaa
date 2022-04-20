<script setup lang="ts">
import { onMounted } from "vue"
import { onBeforeRouteUpdate, RouteLocationNormalized, useRoute, useRouter } from "vue-router"

const route=useRoute()
const router=useRouter()

let savedPost:string|undefined=undefined
onBeforeRouteUpdate((to)=>{
    if(typeof to.params['postId']!=='string')
        return false
    const title=to.params['postId'] || 'index'
    if(savedPost!==undefined && title===savedPost)
        return true
    router.addRoute('pathView',{
        path: '',
        name: 'post',
        component: ()=>import(`../md/${title}.md`).catch(()=>{
            router.replace('/post/NotFound')
        })
    })
    savedPost=title.concat()//深拷贝
    return title==='index'?'/post/':to.path
})

onMounted(()=>{
    if(savedPost===undefined)
        router.replace(route.fullPath+'#'+Math.random())
        //触发一次update
})

const handleHome=()=>{
    router.push('/post')
}

const handleTop=()=>{
    router.push({
        hash: '#top'
    })
}

</script>
<template>
    <div class="post-body">
        <router-view class="c-html-render"/>
        <div class="tail">
            <div>
                <span class="tail-front" @click="handleHome">首页</span>
                <span class="tail-front" @click="handleTop">顶部</span>
            </div>
            <span>这是底线</span>
        </div>
    </div>
</template>
<style scoped lang="scss">
.post-body{
    width: 90%;
    margin: auto;
    padding-bottom: 20px;
    padding-top: 1.2em;
}
.tail {
    border-bottom: 2px rgb(64,70,75) solid;
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    div{
        display: flex;
        align-self: center;
        .tail-front{
            font-size: 20px;
            align-self: center;
            margin-left: 20px;
            user-select: none;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color .6s;
            transition: border-color .4s;
            border: rgba(255,255,255,0) 1px solid;
            
            padding: 3px;
            &:hover {
                background-color: rgba(230,230,230,255);
                border-color: rgba(180,180,180,255);
            }
        }
    }
}
</style>