<script setup lang="ts">
const emit = defineEmits(["clickEvent"]);
function clickBtn() {
    emit("clickEvent");
}
</script>

<template>
    <aside class="flex flex-col">
        <header class="h-16 min-h-16 bg-red-500">
            <el-button type="primary" @click="clickBtn"> 点击 </el-button>
        </header>
        <div class="flex-1 bg-white">Content</div>
    </aside>
</template>
<style lang="less" scoped></style>
