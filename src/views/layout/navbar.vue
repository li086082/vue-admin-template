<script setup lang="ts">
import config from "@/config";
</script>
<template>
    <nav class="navbar">
        <header>{{ config.title }}</header>
    </nav>
    <el-drawer
        :model-value="true"
        direction="ltr"
        :close-on-click-overlay="false"
        :with-header="false">
        <span>Hi there!</span>
    </el-drawer>
</template>
<style lang="less" scoped>
.navbar {
    height: 100%;
    background-color: cadetblue;
}
</style>
