<script setup lang="ts">
import { onMounted,ref } from "vue"
import { onBeforeRouteUpdate, RouteLocationNormalized , useRoute, useRouter } from "vue-router"
import Loading from '../components/Loading.vue'
import NotFound from '../components/NotFound.vue'

const route=useRoute()
const router=useRouter()

const postContent=ref(Loading)
const loadPost=async(target: RouteLocationNormalized)=>{
    postContent.value=Loading
    postContent.value=await import(`../md/${target.params['postId'] as string || 'index'}.md`)
        .then(({default:result})=>result)
        .catch(()=>NotFound)
}
onMounted(()=>loadPost(route))
onBeforeRouteUpdate((to)=>loadPost(to))

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
        <Component :is="postContent" class="c-html-render"/>
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