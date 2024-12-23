<script lang="ts" setup>
import navbar from "@/views/layout/navbar.vue";
import content from "@/views/layout/content.vue";

import { ref, onMounted, onUnmounted } from "vue";
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
    <div class="w-full h-full max-h-full flex flex-row">
        <navbar class="w-56 h-full"></navbar>
        <content class="flex-1 h-full"></content>
    </div>
</template>
<style lang="less" scoped></style>
