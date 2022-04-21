# 关于post

现在写的有点稀碎，以后可能要改，首先是vite的配置，需要的依赖是markdown-it，而他本身是没有代码高亮和todolist的，所以带了俩插件
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import prism from 'markdown-it-prism'
import tasklist from 'markdown-it-task-lists'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/,/\.md$/]
    }),
    Markdown({
      markdownItUses: [
        prism, tasklist
      ]
    })
  ]
})
```
这样就可以import markdown并得到一个component，接下来需要考虑按需加载的问题
如果只是正常写法开头全import的话，访问任意post都需要加载全部post，这显然是不可接受的
~~这里考虑采用了vue-router的动态路由来实现，现在想想好像也可以搞Component组件绑定is，改天可以试试看~~
改好了，代码好看很多

```typescript
const postContent=ref(Loading)
const loadPost=async(target: RouteLocationNormalized)=>{
    postContent.value=Loading
    postContent.value=await import(`../md/${target.params['postId'] as string || 'index'}.md`)
        .then(({default:result})=>result)
        .catch(()=>NotFound)
}
onMounted(()=>loadPost(route))
onBeforeRouteUpdate((to)=>loadPost(to))
```

import蛮有意思的