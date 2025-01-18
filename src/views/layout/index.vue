<script lang="ts" setup>
    import { computed, onMounted, onUnmounted, ref, onBeforeMount } from "vue";
    import navbar from "@/views/layout/navbar.vue";
    import content from "@/views/layout/content.vue";

    const navbarStatus = ref<boolean>(true); // 菜单栏控制变量
    const isMobile = ref<boolean>(false); // pc还是手机模式控制变量

    // 监听子组件中的点击事件 true-显示 false-隐藏
    function setNavbarStatus() {
        navbarStatus.value = !navbarStatus.value;
    }

    // 监听屏幕尺寸变化, 小于680开启手机模式, 菜单栏自动隐藏
    function handleResize() {
        const width = window.innerWidth;
        if (width < 680 && !isMobile.value) {
            isMobile.value = true;
            navbarStatus.value = false; // 手机模式下默认隐藏菜单
        }
        if (width >= 680 && isMobile.value) {
            isMobile.value = false;
            navbarStatus.value = true; // 非手机模式默认显示菜单
        }
    }
    onBeforeMount(() => {
        handleResize(); // 默认执行一次计算当前尺寸, 避免手机模式下刷新菜单默认打开问题
    });
    onMounted(() => {
        window.addEventListener("resize", handleResize);
    });
    onUnmounted(() => {
        window.removeEventListener("resize", handleResize);
    });

    // 动态计算屏幕尺寸变化和点击事件
    const navbarStyle = computed(() => {
        return navbarStatus.value ? "" : "navbarHide";
    });
    const contentStyle = computed(() => {
        return isMobile.value || !navbarStatus.value ? "contentShow" : "";
    });

    // 手机模式下点击遮罩层关闭菜单
    const handleCloseNavbar = () => {
        navbarStatus.value = !navbarStatus.value;
    };
    // 动态计算是否显示遮罩层
    const shadeStyle = computed(() => {
        return isMobile.value && navbarStatus.value ? "shade" : "";
    });
</script>
<template>
    <div class="main_container">
        <navbar
            class="navbarContainer"
            :class="navbarStyle"
        ></navbar>
        <div
            :class="shadeStyle"
            @click="handleCloseNavbar"
        ></div>
        <content
            class="contentContainer"
            :class="contentStyle"
            @click-event="setNavbarStatus"
        ></content>
    </div>
</template>
<style lang="less" scoped>
    @sideBarWidth: 210px; // 菜单栏宽度

    .main_container {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
    .navbarContainer {
        width: @sideBarWidth;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 2;
        transform: translateX(0);
        transition: transform 0.25s linear;
    }
    .navbarHide {
        transform: translateX(-@sideBarWidth);
    }
    .contentContainer {
        flex: 1;
        height: 100%;
        margin-left: @sideBarWidth;
        position: relative;
        z-index: 1;
        transition: margin-left 0.25s linear;
    }
    .contentShow {
        z-index: 0;
        margin-left: 0;
    }
    .shade {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: #000;
        z-index: 1;
        opacity: 0.3;
    }
</style>
