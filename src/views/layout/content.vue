<script setup lang="ts">
const emit = defineEmits(["clickEvent"]);
function clickBtn() {
    emit("clickEvent");
}
</script>

<template>
    <aside class="aside">
        <header class="head">
            <el-button type="primary" @click="clickBtn"> 点击 </el-button>
        </header>
        <div class="">Content</div>
    </aside>
</template>
<style lang="less" scoped>
.aside {
    display: flex;
    flex: 1;
    flex-direction: column;

    & > .head {
        width: 100%;
        height: var(--header-height);
        background-color: #fff;
    }
}
</style>
