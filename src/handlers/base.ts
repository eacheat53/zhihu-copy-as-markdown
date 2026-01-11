/**
 * handlers 公共模块
 * 提取 NormalItem 和 PinItem 的共同代码
 */
import * as JSZip from "jszip";
import type { LexType } from "../core/tokenTypes";
import type { FrontmatterData } from "../core/frontmatter";

/**
 * Handler 处理结果类型
 */
export interface HandlerResult {
    lex: LexType[];
    markdown: string[];
    zip: JSZip;
    title: string;
    itemId: string;
    metadata: FrontmatterData;
}

/**
 * 生成 8 位 UUID
 */
export function getUUID(): string {
    return "xxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

/**
 * 安全解析 JSON 属性
 */
export function safeParseAttribute(element: HTMLElement | null, attrName: string): unknown {
    if (!element) return null;
    try {
        const attr = element.getAttribute(attrName);
        if (attr) return JSON.parse(decodeURIComponent(attr));
    } catch { }
    return null;
}
