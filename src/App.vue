<script setup lang="ts">
import HelloWrold from "@/components/HelloWorld.vue";

import {ref, onMounted, onUnmounted} from "vue";
const screenWidth = ref(window.innerWidth);
function handleResize() {
    screenWidth.value = window.innerWidth;
}
onMounted(()=>{
    window.addEventListener('resize', handleResize);
});
onUnmounted(()=>{
    window.removeEventListener('resize', handleResize);
});

</script>

<template>
	hello world
	<HelloWrold></HelloWrold>
</template>

<style scoped>

</style>
