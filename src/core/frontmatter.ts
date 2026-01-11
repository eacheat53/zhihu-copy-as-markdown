/**
 * YAML Frontmatter 生成器
 * 用于生成 Obsidian 兼容的 YAML frontmatter
 */

/**
 * Frontmatter 数据接口
 */
export interface FrontmatterData {
    /** 作者名称 */
    author: string;
    /** 来源平台 */
    source: string;
    /** 原文链接 */
    url: string;
    /** 保存时间 */
    created: string;
    /** 标签列表 */
    tags?: string[];
    /** 文章/回答标题 */
    title?: string;
}

/**
 * 转义 YAML 字符串值
 * 如果包含特殊字符则用引号包裹
 */
function escapeYamlValue(value: string): string {
    if (!value) return "\"\"";

    // 检查是否需要引号包裹
    const needsQuotes = /[:#\[\]{}|>&*!?,'"\\`@%]/.test(value) ||
        value.trim() !== value ||
        value.includes("\n");

    if (needsQuotes) {
        // 转义双引号和反斜杠
        const escaped = value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
        return `"${escaped}"`;
    }

    return value;
}

/**
 * 生成 YAML frontmatter 字符串
 * @param data frontmatter 数据
 * @returns 带有 --- 分隔符的 YAML frontmatter 字符串
 */
export function generateFrontmatter(data: FrontmatterData): string {
    const lines: string[] = ["---"];

    // 标题（如果有）
    if (data.title) {
        lines.push(`title: ${escapeYamlValue(data.title)}`);
    }

    // 作者
    lines.push(`author: ${escapeYamlValue(data.author)}`);

    // 链接
    lines.push(`url: ${escapeYamlValue(data.url)}`);

    // 创建时间
    lines.push(`created: ${data.created}`);

    lines.push("---");
    lines.push(""); // 空行分隔

    return lines.join("\n");
}

/**
 * 格式化日期为 YYYY-MM-DD-HH-mm
 */
function formatDate(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}-${pad(date.getHours())}-${pad(date.getMinutes())}`;
}

/**
 * 构建元数据（用于 YAML frontmatter）
 */
export function buildMetadata(title: string, author: string, url: string): FrontmatterData {
    return {
        title,
        author,
        source: "知乎",
        url,
        created: formatDate(new Date()),
    };
}
