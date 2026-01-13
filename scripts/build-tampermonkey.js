/**
 * 构建油猴脚本
 * 将 webpack 输出的 bundle.min.js 添加 UserScript 头部
 */
import fs from "fs";
import { UserScript, UserScriptContent } from "../TampermonkeyConfig.js";

// 计算 padding 长度
const paddingLength = Object.entries(UserScript).reduce((maxLength, [key]) => {
    return Math.max(maxLength, key.length);
}, 0) + 1;

// 生成 Tampermonkey UserScript Config
const TampermonkeyConfig = Object.entries(UserScript).map(([key, value]) => {
    if (!value) return;

    if (typeof value == "object")
        return Object.entries(value).map(([_key, value]) => {
            return `// @${key.padEnd(paddingLength, " ")} ${value}`;
        }).join("\n");

    return `// @${key.padEnd(paddingLength, " ")} ${value}`;

}).filter((val) => val).join("\n");

// 读取更新日志
const UpdateLog = fs.existsSync("./UpdateLog.txt")
    ? fs.readFileSync("./UpdateLog.txt", "utf-8").toString().split("\n").map((line) => {
        return ` * ${line}`;
    }).join("\n")
    : " * No update log";

// 写入油猴脚本
fs.writeFileSync("./dist/tampermonkey-script.js", `// ==UserScript==
${TampermonkeyConfig}
// ==/UserScript==

/** 更新日志
${UpdateLog}
 */

${UserScriptContent}`, "utf-8");

console.log("✅ 油猴脚本构建完成: dist/tampermonkey-script.js");
