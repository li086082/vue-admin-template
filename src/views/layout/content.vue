<script setup lang="ts">
    import { Icon } from "@iconify/vue";
    import { ref } from "vue";
    import type { DropdownInstance } from "element-plus";
    import app from "@/config";
    import { useTabStore } from "@/store/tabStore";
    import Tab from "@/views/layout/tab.vue";
    import { RouterView, useRouter } from "vue-router";
    import { doLogout } from "@/apis/login";
    import { useAppStore } from "@/store/appStore";

    // router
    const router = useRouter();

    // tab存储
    const tabs = useTabStore();
    function addTab() {
        tabs.addTab({ name: "系统设置", active: true });
    }
    function reductTab() {
        tabs.reduceTab("系统设置");
    }

    // 按钮动画
    const menuOnoff = ref<boolean>(false);

    // 菜单-显示/隐藏触发按钮
    const emit = defineEmits(["clickEvent"]);
    function clickBtn() {
        menuOnoff.value = !menuOnoff.value;
        emit("clickEvent");
    }

    // 点击个人信息
    const dropdown = ref<DropdownInstance>();
    function clickMore() {
        if (!dropdown.value) return;
        dropdown.value.handleOpen();
    }

    // 点击"退出"
    function handleLogout() {
        const appStore = useAppStore();

        if (!appStore.isLogin || !appStore.refreshToken) {
            appStore.setEmpty();
            router.replace({ name: "login" });
            return;
        }

        doLogout().finally(() => {
            appStore.setEmpty();
            router.replace({ name: "login" });
        });
    }
</script>

<template>
    <aside class="aside">
        <header
            class="head"
            :class="{ 'fixed_head': app.flxedHeader }"
        >
            <Icon
                icon="ri:menu-fold-2-fill"
                width="20"
                height="20"
                class="icon"
                :class="{ 'rotated': menuOnoff }"
                @click="clickBtn"
            ></Icon>
            <div
                class="info"
                @click="clickMore"
            >
                <img
                    class="avatar"
                    src="http://landing.dfkj8.com/mshy/avatar.webp"
                />
                <Icon
                    icon="si:expand-more-fill"
                    width="20"
                    height="20"
                ></Icon>
                <el-dropdown
                    placement="bottom"
                    ref="dropdown"
                >
                    <span class="el-dropdown-link"></span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>个人中心</el-dropdown-item>
                            <el-dropdown-item
                                @click="handleLogout"
                                divided
                            >
                                退出登录
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </header>
        <div
            v-if="app.openTab"
            class="tab"
            :class="{ 'fixed_tab': app.flxedHeader }"
        >
            <Tab></Tab>
        </div>
        <div class="box">
            <el-card>
                <RouterView></RouterView>
            </el-card>
        </div>
    </aside>
</template>
<style lang="less" scoped>
    .aside {
        height: 100%;
        display: flex;
        flex-direction: column;

        .head {
            width: 100%;
            height: var(--header-height);
            line-height: var(--header-height);
            background-color: #fff;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 15px 25px 10px 15px;
            align-items: center;
            box-shadow: 0 1px 3px rgba(0, 21, 41, 0.1);
            z-index: 11;

            .icon {
                cursor: pointer;
                transition: transform 10 ease-in-out;
            }

            .rotated {
                transform: rotate(180deg);
            }

            .info {
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                cursor: pointer;
                .avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 30%;
                }
            }
        }

        .fixed_head {
            position: sticky;
            top: 0;
        }

        .tab {
            width: 100%;
            height: var(--tab-height);
            line-height: var(--tab-height);
            box-sizing: border-box;
            border-bottom: 0.8px solid rgb(216, 220, 229);
            background-color: #fff;
            box-shadow: 0 1px 4px rgba(0, 21, 41, 0.1);
            z-index: 10;
        }

        .fixed_tab {
            position: sticky;
            top: var(--header-height);
        }

        .box {
            padding: 16px;
        }
    }
    .example-showcase .el-dropdown-link {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex;
        align-items: center;
    }
</style>
