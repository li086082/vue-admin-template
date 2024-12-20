/**

 * @see https://prettier.nodejs.cn/docs/en/configuration.html

 * @type {import("prettier").Config}
 */
const config = {
    trailingComma: "es5",
    tabWidth: 4,
    semi: true, // 分号
    singleQuote: false, // 双引号
    bracketSpacing: true, // 对象值前添加一个空格
    printWidth: 80, // 一行最大宽度
    bracketSameLine: true, // 结束标签不另起一行
    arrowParens: "always", // 箭头函数参数总是用括号包裹
    endOfLine: "crlf",
    singleAttributePerLine: true,
};

export default config;
