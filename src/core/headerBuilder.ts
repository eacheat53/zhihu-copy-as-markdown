/**
 * 公共元数据构建工具
 */
import type { FrontmatterData } from "./frontmatter";

/**
 * 构建元数据（用于 YAML frontmatter）
 */
export function buildMetadata(title: string, author: string, url: string): FrontmatterData {
    return {
        title,
        author,
        source: "知乎",
        url,
        created: new Date().toISOString(),
    };
}

