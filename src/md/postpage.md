# 关于post

## 外部依赖

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

## markdown动态加载

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

import蛮有意思的，正常import进来是放在default里，感觉静态import有点语法糖的意思了

现在这个实现大概有点问题，如果上一个加载还没加载完就跑下一个加载，最后的结果就race了，如果硬要修复的话可能可以去搞点类似保存上一次的promise，每次新的进来之后都把之前的取消掉（？）有点奇妙的逻辑，mark一下之后研究

## 一些小细节

最近简单学习了一下scss的写法，感觉还是很香的,只能说以前的我估计都想不到样式能写那么多
主要说说那个导航组件吧，感觉那是写的最复杂的一个了

### 右侧背景hover渐变
```css
.right {
    div {
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
    }
}
```
一个奇妙的小trick，通过给background-position上transition再加上更大的渐变背景，就可以实现背景变色的效果

### 左侧的各种选择器与动画
```css
li {
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
```
一坨选择器用了个爽，实现了几个效果：
1. 被选中的选项加上小箭头，同时鼠标变成箭头
2. 最底部的一项为留空的，各个地方进行了判断
3. 奇偶选项分开了背景颜色
4. 被选中的项右移，配合过渡实现选中的效果

最后这个用的是动态绑定class做的，其实这么简单的效果可以用style的v-bind语法试试，改天研究一下

### 跳动的圆点
```css
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
```
~~一开始就想引用了animate.css苦于没地方用，看到这里有空就塞上了~~
感觉也能算是入门级的css动画效果了，看着还是舒服的，虽然灵感肯定是以前看的不知道哪里的科普，但是自己塞动画并实现的感觉还是蛮不错的