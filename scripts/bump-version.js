/**
 * 自动更新版本号
 * 递增 package.json 中的 patch 版本号
 */
import fs from "fs";

const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
const version = packageJson.version.split(".").map((val) => parseInt(val));

// 递增 patch 版本号
version[version.length - 1] += 1;

packageJson.version = version.join(".");

fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2) + "\n");

console.log(`✅ 版本号已更新: ${version.join(".")}`);
