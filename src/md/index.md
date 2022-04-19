# 首页？导航页？

<Navigator/>

## todo

- [x] 导入todolist（废话） 4.19
- [ ] 美化一下todolist，现在字有点小？而且前面有个傻乎乎的点
- [ ] 导航的link还需要美化一下
- [ ] 除了纯文字风格的post还想要有类似欢迎页的playground来写一些trick
- [ ] 把博文补一补
- [ ] **部署到pages上！**

## 写在诞生日

这个博客的诞生日大概算是2022.4.18，虽然前面欢迎页之类的已经写了有两天了。但是果然有`post`页面才有了博客的感觉。正是大三下对前途有些迷茫的时候，面试了几个大厂的前端被拒的稀里哗啦的，感觉自己就是半瓶水晃荡晃荡，于是就想到自己做一个博客，无论如何也是能看看自己到底有多少本事。塞上各种奇怪地方搜罗来的小灵感，手写JS动画写了一个[欢迎页](/)，不妨去康康！

实际上第一天已经过了（从24点来看的话），但还没合眼，还能算诞生日。今天博客暂时还没有导航，这就是明天的todo了！虽然明天还要早八体育接编译原理期中（

## 一点小测试

先测试一下图片引用是否正常：

![](../assets/avatar.jpg)

fine，代码高亮：

```c
#include "stdio.h"
int main(){
    int a,b;
    scanf("%d%d",&a,&b);
    printf("%d\n",a+b);
    return 0;
}
```

fine，接下来试试写vue

<Counter/>
<script setup>
import Counter from '../components/Counter.vue'
import Navigator from '../components/Navigator.vue'
</script>

cool!
