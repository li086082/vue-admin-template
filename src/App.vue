<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const screenWidth = ref(window.innerWidth)
function handleResize() {
    screenWidth.value = window.innerWidth
}
onMounted(() => {
    window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<template>hello world</template>

<style scoped></style>
