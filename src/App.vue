<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import store from "@/store/app";

function handleResize() {
    console.log(window.innerWidth);
    if (window.innerWidth >= 680) {
    }
}
onMounted(() => {
    window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
});
</script>

<template><RouterView></RouterView></template>

<style scoped></style>
