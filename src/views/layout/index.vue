<script lang="ts" setup>
import navbar from "@/views/layout/navbar.vue";
import content from "@/views/layout/content.vue";
</script>
<template>
    <div class="layout">
        <navbar></navbar>
        <content></content>
    </div>
</template>
<style lang="less" scoped>
.layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    background-color: bisque;
}
</style>
