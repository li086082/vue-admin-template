<script lang="ts" setup>
import navbar from "@/views/layout/navbar.vue";
import content from "@/views/layout/content.vue";
</script>
<template>
    <div class="box">
        <navbar></navbar>
        <content></content>
    </div>
</template>
<style lang="less" scoped>
.box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}
</style>
