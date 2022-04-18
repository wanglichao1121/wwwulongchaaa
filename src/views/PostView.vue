<script setup lang="ts">
import { computed, watch, ref } from "vue"
import { useRoute } from "vue-router"
const route=useRoute()
const postId=computed(()=>
    typeof route.params['postId']=='string'?route.params['postId']:route.params['postId'][0]
)
</script>
<template>
    <router-view/>
</template>
<style>
</style>