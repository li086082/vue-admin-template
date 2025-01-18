<script setup lang="ts">
    import { ref } from "vue";

    const emit = defineEmits<{
        getList: [page: number, size: number];
    }>();

    let { page, size, total, sizes } = defineProps<{
        page: number;
        size: number;
        total: number;
        sizes?: number[];
    }>();

    const newPage = ref<number>(page);
    const newSize = ref<number>(size);
    const newSizes = sizes == undefined ? ref<number[]>([10, 20, 30, 40, 50]) : ref<number[]>(sizes);

    const clickPage = (v: number) => {
        newPage.value = v;
        emit("getList", newPage.value, newSize.value);
    };

    const clickPageSize = (v: number) => {
        newSize.value = v;
        emit("getList", newPage.value, newSize.value);
    };
</script>

<template>
    <div class="pages">
        <el-pagination
            v-model:current-page="newPage"
            v-model:page-size="newSize"
            :page-sizes="newSizes"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="clickPageSize"
            @current-change="clickPage"
        />
    </div>
</template>

<style scoped lang="less">
    .pages {
        width: 100%;
        height: 48px;
        margin-top: 16px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
</style>
