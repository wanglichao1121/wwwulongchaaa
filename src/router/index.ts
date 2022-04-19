import Welcome from '../views/Welcome.vue'
import PostView from '../views/PostView.vue'
import {createRouter, createWebHistory, RouteLocationNormalized} from 'vue-router'
import NotFound from '../views/NotFound.vue'

let savedPost:string[]|undefined=undefined
export const updatePost=(to:RouteLocationNormalized)=>{
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
    savedPost=title.concat()
    return (title.length==1 && title[0]==='index')?'/post/':to.fullPath
}

const router=createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        component: Welcome
    },{
        path: '/post/:postId*',
        name: 'pathView',
        component: PostView,
        beforeEnter: updatePost
    }],
    scrollBehavior (to, from, savedPosition) {
        return {top: 0}
      }
})

export default router