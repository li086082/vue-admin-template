<script setup lang="ts">
import config from "@/config";
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>
<template>
    <nav
        class="nav"
        :class="[store.mobile ? 'show' : 'hide']">
        <header class="h-16 min-h-16">{{ config.title }}</header>
        <el-scrollbar wrap-style="flex-1">
            <p>11111</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>333</p>
            <p>222</p>
            <p>111</p>
            <p>100</p>
        </el-scrollbar>
    </nav>
</template>
<style lang="less" scoped>
.nav {
    width: var(--nav-bar-width);
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #1e293b;
}
.show {
    position: relative;
    z-index: 1;
    opacity: 1;
    transition: width 28s;
}
.hide {
    position: fixed;
    z-index: -1;
    opacity: 0;
    transition: width 28s;
}
</style>
