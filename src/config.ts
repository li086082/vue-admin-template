interface cfg {
    title: string;
    fixHeader: boolean;
    showLogo: boolean;
}

const config = {
    title: "管理后台", // 后台名称
    fixHeader: true, // 是否固定头部
    showLogo: false, // 是否显示logo
} satisfies cfg;

export default config;
