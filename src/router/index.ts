import Welcome from '../views/Welcome.vue'
import PostView from '../views/PostView.vue'
import {createRouter, createWebHistory} from 'vue-router'
import NotFound from '../views/NotFound.vue'
let savedPost:string[]|undefined=undefined
const router=createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        component: Welcome
    },{
        path: '/post/:postId*',
        name: 'pathView',
        component: PostView,
        beforeEnter: async(to,from)=>{
            if(typeof to.params['postId']==='string' && to.params['postId']!=='')
                return false
            const title=to.params['postId'] || ['index']
            if(savedPost!==undefined && title.join('/')===savedPost.join('/'))
                return true
            router.addRoute('pathView',{
                path: '',
                component: ()=>import(`../md/${title.join('/')}.md`).catch(()=>NotFound)
            })
            savedPost=title.concat()
            return (title.length==1 && title[0]==='index')?'/post/':to.fullPath
        },
    }
]
})

export default router