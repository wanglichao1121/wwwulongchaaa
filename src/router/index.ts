import Welcome from '../views/Welcome.vue'
import PostView from '../views/PostView.vue'
import {createRouter, createWebHistory, RouteLocationNormalized} from 'vue-router'
import { titles } from '../md/meta'

const router=createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        name: 'Welcome',
        component: Welcome
    },{
        path: '/post/:postId?',
        name: 'pathView',
        component: PostView
    }],
    scrollBehavior (to, from, savedPosition) {
        return {top: 0}
    }
})
router.beforeEach((to)=>{
    console.log(to.params)
    console.log(to.name)
    if(to.name?.toString()==='pathView' || to.name?.toString()==='post')
        document.title=titles[to.params['postId'] as string]+' | wwwulongcha';
    else
        document.title=to.name?.toString()+' | wwwulongcha';
})
export default router