<script setup lang="ts">
    import { useTabStore } from "@/store/tabStore";

    const tabs = useTabStore();

    // 默认追加仪表盘
    tabs.addTab({ name: "仪表盘", active: true });
</script>

<template>
    <el-scrollbar>
        <div class="tab">
            <div
                class="item"
                v-for="item in tabs.openTabs"
                :key="item.name"
                :class="{ 'active': item.active }"
            >
                {{ item.name }}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="12"
                    viewBox="0 0 12 16"
                    class="close_icon"
                >
                    <path
                        fill="currentColor"
                        d="M10 12.5a.47.47 0 0 1-.35-.15l-8-8c-.2-.2-.2-.51 0-.71s.51-.2.71 0l7.99 8.01c.2.2.2.51 0 .71c-.1.1-.23.15-.35.15Z"
                    />
                    <path
                        fill="currentColor"
                        d="M2 12.5a.47.47 0 0 1-.35-.15c-.2-.2-.2-.51 0-.71l8-7.99c.2-.2.51-.2.71 0s.2.51 0 .71l-8.01 7.99c-.1.1-.23.15-.35.15"
                    />
                </svg>
            </div>
            <!-- <div
                class="item"
                v-for="item in 10"
                :key="item"
            >
                {{ item }}
            </div> -->
        </div>
    </el-scrollbar>
</template>
<style lang="less" scoped>
    @tab-height: calc(var(--tab-height) - 10px);

    .tab {
        width: 100%;
        height: var(--tab-height);
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        .item {
            flex-shrink: 0;
            margin-left: 5px;
            padding: 0 4px 0 8px;
            height: @tab-height;
            line-height: @tab-height;
            border: 1px solid #d8dce5;
            font-size: 12px;
            cursor: pointer;
            font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial,
                sans-serif;
            color: #495060;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            -webkit-user-select: none; /* Safari */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* IE/Edge */
            user-select: none; /* 标准语法 */
        }
        .item:first-child {
            margin-left: 10px;
        }

        .active {
            background-color: #42b983;
            color: #fff;
            border-color: #42b983;
        }
        .active::before {
            content: "";
            width: 6px;
            height: 6px;
            display: inline-block;
            border-radius: 50%;
            background-color: #fff;
            position: relative;
            margin-right: 5px;
        }
        .close_icon {
            margin-left: 6px;
            padding: 3px 5px;
            &:hover {
                border-radius: 50%;
                background-color: #b4bccc;
                color: #fff;
            }
        }
    }
    ::v-deep(.el-scrollbar__bar.is-vertical) {
        display: none; /* 隐藏水平滚动条 */
    }
</style>
