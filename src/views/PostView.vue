<script setup lang="ts">
import { computed, watch, ref } from "vue"
import { useRoute } from "vue-router"
const route=useRoute()
</script>
<template>
    <div class="post-body c-html-render">
        <router-view/>
    </div>
</template>
<style>
.post-body{
    width: 90%;
    margin: auto;
}
</style>