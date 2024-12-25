<script setup lang="ts">
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>
<template>
    <nav class="nav">
        <header class="">{{ store.appName }}</header>
    </nav>
</template>
<style lang="less" scoped>
@menuBg: #304156; // 菜单栏整体背景颜色
@menuText: #bfcbd9;
@menuActiveText: #409eff;
@subMenuActiveText: #f4f4f5;
@menuHover: #263445;
@subMenuBg: #1f2d3d;
@subMenuHover: #001528;

.nav {
    background-color: @menuBg;
}
</style>
