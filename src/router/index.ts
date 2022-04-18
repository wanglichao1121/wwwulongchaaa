import Welcome from '../views/Welcome.vue'
import {createRouter, createWebHistory} from 'vue-router'
const routes=[
    {path: '/', component: Welcome}
]

export default createRouter({
    history: createWebHistory(),
    routes
})