<script setup lang="ts">
    import app from "@/config";
    import { Icon } from "@iconify/vue";
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
                default-active="2"
                :show-timeout="0"
                :hide-timeout="0"
            >
                <el-sub-menu index="2">
                    <template #title>
                        <Icon
                            icon="ic:baseline-apps"
                            height="18"
                            width="18"
                            style="margin-right: 8px"
                        />
                        <span>系统设置</span>
                    </template>
                    <el-menu-item index="1-2-1">item one</el-menu-item>
                    <el-menu-item index="1-2-2">item one</el-menu-item>
                    <el-menu-item index="1-2-3">item one</el-menu-item>
                    <el-menu-item index="1-2-4">item one</el-menu-item>
                    <el-menu-item index="1-2-5">item one</el-menu-item>
                    <el-menu-item index="1-2-6">item one</el-menu-item>
                    <el-menu-item index="1-2-7">item one</el-menu-item>
                    <el-menu-item index="1-2-8">item one</el-menu-item>
                    <el-menu-item index="1-2-9">item one</el-menu-item>
                    <el-menu-item index="1-2-10">item one</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="1-4">
                    <template #title>
                        <Icon
                            icon="ic:baseline-blur-on"
                            height="18"
                            width="18"
                            style="margin-right: 8px"
                        />
                        <span>游戏管理</span>
                    </template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                    <el-menu-item index="2-2-2">item one</el-menu-item>
                    <el-menu-item index="2-2-3">item one</el-menu-item>
                    <el-menu-item index="2-2-4">item one</el-menu-item>
                    <el-menu-item index="2-2-5">item one</el-menu-item>
                    <el-menu-item index="2-2-6">item one</el-menu-item>
                    <el-menu-item index="2-2-7">item one</el-menu-item>
                    <el-menu-item index="2-2-8">item one</el-menu-item>
                    <el-menu-item index="2-2-9">item one</el-menu-item>
                    <el-menu-item index="2-2-10">item one</el-menu-item>
                    <el-menu-item index="2-2-11">item one</el-menu-item>
                    <el-menu-item index="2-2-12">item one</el-menu-item>
                    <el-menu-item index="2-2-13">item one</el-menu-item>
                    <el-menu-item index="2-2-14">item one</el-menu-item>
                    <el-menu-item index="2-2-15">item one</el-menu-item>
                    <el-menu-item index="2-2-16">item one</el-menu-item>
                    <el-menu-item index="2-2-17">item one</el-menu-item>
                    <el-menu-item index="2-2-18">item one</el-menu-item>
                    <el-menu-item index="2-2-19">item one</el-menu-item>
                    <el-menu-item index="2-2-20">item one</el-menu-item>
                    <el-menu-item index="2-2-31">item one</el-menu-item>
                </el-sub-menu>
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
