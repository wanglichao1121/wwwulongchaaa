<template>
  <div style="display: flex;flex-direction: row;">
    <button @click="handleClick">{{cnt || 'Click!'}}</button>
    <div>
        <p v-if="cnt>=10">小彩蛋~</p>
        <p v-if="cnt>=30">中彩蛋~</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const cnt=ref(0)
const handleClick=()=>{
    cnt.value++;
}
</script>

<style scoped>
button {
    border-radius: 10px;
    width: 200px;
    height: 100px;
    font-size: 30px;
    cursor: pointer;
}
</style>