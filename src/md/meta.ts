export const nav_list=[
    {
        name: '📦关于博客',
        secDir: [{
            link:'welcomepage',
            date: '2022-04-20'
        },{
            link:'postpage',
            date: '2022-04-20'
        }]
    },{
        name: '💻安全相关',
        secDir: [{
            link:'pwn',
            date: '2022-04-20'
        }]
    },{
        name: '🎮游戏相关',
        secDir: []
    }
]
export const titles:Record<string,string>={
    '': '首页',
    'welcomepage': '关于欢迎页',
    'postpage': '关于post',
    'pwn': '一些pwn的题',
    'NotFound': '404NotFound'
}