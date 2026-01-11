import * as JSZip from "jszip";
import { lexer } from "../core/lexer";
import { parser } from "../core/parser";
import * as utils from "../core/utils";
import savelex from "../core/savelex";
import { buildMetadata } from "../core/frontmatter";
import { type HandlerResult, getUUID, safeParseAttribute } from "./base";

export default async (dom: HTMLElement): Promise<HandlerResult> => {
    const lex = lexer(dom.childNodes as NodeListOf<Element>);

    const zopQuestion = safeParseAttribute(
        document.querySelector("[data-zop-question]") as HTMLElement,
        "data-zop-question"
    );

    const zopElement = utils.getParent(dom, "AnswerItem") || utils.getParent(dom, "Post-content");
    const zop = safeParseAttribute(zopElement || null, "data-zop") as { itemId?: string } | null;

    const zaExtra = safeParseAttribute(
        document.querySelector("[data-za-extra-module]") as HTMLElement,
        "data-za-extra-module"
    );

    const title = utils.getTitle(dom);
    const author = utils.getAuthor(dom);
    const url = utils.getURL(dom);
    const authorName = author?.name || "未知作者";

    // 生成 Markdown 内容
    const markdown = parser(lex);

    // 构建元数据
    const metadata = buildMetadata(title, authorName, url);

    // 创建 ZIP
    const zip = await savelex(lex);
    zip.file("info.json", JSON.stringify({
        title, url, author,
        zop,
        "zop-question": zopQuestion,
        "zop-extra-module": zaExtra,
    }, null, 4));

    const itemId = zop?.itemId || getUUID();

    return { lex, markdown, zip, title, itemId, metadata };
};