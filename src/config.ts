interface IApp {
    title: string; // 后台标题
    showLogo: boolean; // 是否显示logo
    flxedHeader: boolean; // 是否固定表头
    openTab: boolean; // 是否开启tab快速切换
}

const app: IApp = {
    title: "Manager System",
    showLogo: true,
    flxedHeader: true,
    openTab: true,
};

export default app;
