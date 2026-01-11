import { parser } from "../core/parser";
import { pinsLexer as lexer } from "../core/lexer";
import { TokenType } from "../core/tokenTypes";
import type { TokenFigure } from "../core/tokenTypes";
import * as utils from "../core/utils";
import savelex from "../core/savelex";
import { buildMetadata } from "../core/frontmatter";
import { type HandlerResult, safeParseAttribute } from "./base";

export default async (dom: HTMLElement): Promise<HandlerResult> => {
    const lex = lexer(dom);

    const pinItem = utils.getParent(dom, "PinItem");

    if (pinItem) {
        // 获取图片
        const imgs = Array.from(pinItem.querySelectorAll(".Image-PreviewVague > img")) as HTMLImageElement[];

        imgs.forEach((img) => {
            lex.push({
                type: TokenType.Figure,
                src: img.getAttribute("data-original") || img.getAttribute("data-actualsrc"),
            } as TokenFigure);
        });
    }

    // 生成 Markdown 内容
    const markdown = parser(lex);

    // 解析 zop 和 zaExtra
    const zop = safeParseAttribute(pinItem || null, "data-zop") as { itemId: string } | null;
    const zaExtra = safeParseAttribute(pinItem || null, "data-za-extra-module");

    const author = utils.getAuthor(dom);
    const url = "https://www.zhihu.com/pin/" + (zop?.itemId || "");
    const authorName = author?.name || "未知作者";

    // 构建元数据
    const metadata = buildMetadata("想法", authorName, url);

    // 创建 ZIP
    const zip = await savelex(lex);
    zip.file("info.json", JSON.stringify({
        author,
        url,
        zop,
        "zop-extra-module": zaExtra,
    }, null, 4));

    return {
        lex,
        markdown,
        zip,
        title: "想法",
        itemId: zop?.itemId || "",
        metadata,
    };
};