<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { RouterView } from "vue-router";
const screenWidth = ref(window.innerWidth);
function handleResize() {
    screenWidth.value = window.innerWidth;
}

onMounted(() => {
    window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
});
</script>

<template>
    <RouterView></RouterView>
</template>

<style scoped></style>
