import Welcome from '../views/Welcome.vue'
import PostView from '../views/PostView.vue'
import {createRouter, createWebHistory, RouteLocationNormalized} from 'vue-router'

const router=createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
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

export default router