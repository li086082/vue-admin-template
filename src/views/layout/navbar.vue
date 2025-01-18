<script setup lang="ts">
    import app from "@/config";
    import { Icon } from "@iconify/vue";
    import { useAppStore } from "@/store/appStore";

    const { menus } = useAppStore();
</script>
<template>
    <nav class="nav">
        <header
            class="head"
            v-if="app.showLogo"
        >
            {{ app.title }}
        </header>
        <el-scrollbar>
            <el-menu
                default-active="/sys/menu"
                :router="true"
            >
                <template
                    v-for="menu in menus"
                    :key="menu.id"
                >
                    <el-sub-menu
                        index="4"
                        v-if="menu.children"
                    >
                        <template #title>
                            <Icon
                                v-if="menu.icon"
                                :icon="menu.icon"
                                height="18"
                                width="18"
                                style="margin-right: 8px"
                            />
                            <span>{{ menu.name }}</span>
                        </template>
                        <el-menu-item
                            v-for="(v, k) in menu.children"
                            :key="k"
                            :index="v.route"
                        >
                            <Icon
                                v-if="v.icon"
                                :icon="v.icon"
                                height="18"
                                width="18"
                                style="margin-right: 8px"
                            />
                            {{ v.name }}
                        </el-menu-item>
                    </el-sub-menu>
                </template>
            </el-menu>
        </el-scrollbar>
    </nav>
</template>
<style lang="less">
    @menuBg: #304156; // 菜单栏整体背景颜色
    @logoBg: #2b2f3a; // logo背景色
    @menuText: #bfcbd9; // 文字默认显示颜色
    @menuActiveText: #409eff; // 点击后显示颜色
    @menuHover: #263445;
    @subMenuBg: #1f2d3d;
    @subMenuHover: #001528;
    @sideBarWidth: 210px; // 菜单栏宽度

    .nav {
        background-color: @menuBg;
    }
    .nav .head {
        width: 100%;
        height: var(--header-height);
        line-height: var(--header-height);
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        color: #fff;
        font-size: 14px;
        background-color: @logoBg;
    }
    .nav .el-menu {
        background-color: @menuBg;
        border-right: none;
    }
    .el-menu .el-sub-menu__title {
        color: @menuText;
    }
    .el-menu .el-sub-menu__title:hover {
        background-color: @menuHover;
    }
    .el-menu .el-sub-menu__title:hover {
        color: @menuText;
    }
    .el-menu.el-menu--inline {
        background-color: @subMenuBg;
    }
    .el-menu.el-menu--inline .el-menu-item {
        color: @menuText;
    }
    .el-menu.el-menu--inline .el-menu-item:hover {
        background-color: @subMenuHover;
    }
    .el-menu.el-menu--inline .el-menu-item.is-active {
        color: @menuActiveText;
    }
</style>
