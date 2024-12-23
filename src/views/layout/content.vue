<script setup lang="ts">
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>
<template>
    <aside class="flex-1 flex-col">
        <header class="h-16 min-h-16 bg-red-500">
            <button
                v-on:click="
                    {
                        {
                            store.setMobile(!store.mobile);
                        }
                    }
                ">
                按钮
            </button>
        </header>
        <div class="flex-1">box</div>
    </aside>
</template>
<style lang="less" scoped></style>
