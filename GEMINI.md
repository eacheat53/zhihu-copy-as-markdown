# 知乎下载器 (zhihu-copy-as-markdown)

一键复制知乎文章/回答/想法为 Markdown，下载为 zip，或直接保存到 Obsidian。

## 技术栈

- **语言**: TypeScript
- **构建**: Webpack 5
- **包管理**: pnpm
- **目标环境**: Tampermonkey 油猴脚本

## 项目结构

```
src/
├── index.ts              # 主入口
├── core/                 # 核心模块
│   ├── lexer.ts          # DOM → Token（含 pinsLexer）
│   ├── parser.ts         # Token → Markdown
│   ├── frontmatter.ts    # YAML 元数据生成
│   ├── obsidianSaver.ts  # Obsidian 保存功能
│   ├── tokenTypes.ts     # 类型定义
│   ├── utils.ts          # DOM 工具函数
│   ├── savelex.ts        # ZIP 打包
│   └── download2zip.ts   # 文件下载
└── handlers/             # 内容处理器
    ├── base.ts           # 公共类型和工具
    ├── NormalItem.ts     # 回答/文章处理
    └── PinItem.ts        # 想法处理

scripts/
├── bump-version.js       # 版本号递增
└── build-tampermonkey.js # 油猴脚本生成
```

## 常用命令

| 命令 | 作用 |
|------|------|
| `pnpm dev` | 开发模式（watch + serve） |
| `pnpm build` | 生产构建（版本递增 + webpack + 油猴脚本） |
| `pnpm lint` | ESLint 检查 |

## 工作规则

### 构建流程

`pnpm build` 会自动执行：
1. `scripts/bump-version.js` - 递增 patch 版本号
2. `webpack --mode production` - 构建 bundle.min.js
3. `scripts/build-tampermonkey.js` - 生成油猴脚本

### 更新日志规则

**每次功能变更后必须更新 `UpdateLog.txt`**：
- 格式: `vX.X.X - 简要描述`
- 详细变更用 `- ` 列表
- 新版本放在文件顶部
- 更新日志会自动嵌入到油猴脚本头部

### 版本号

- 格式: `major.minor.patch`
- `pnpm build` 自动递增 patch 版本
- 油猴脚本版本包含 md5 哈希后缀

## 注意事项

- 按钮 z-index 保持较低值（1），避免遮挡知乎弹窗
- 使用 flexbox 居中确保按钮文字对齐
- `TampermonkeyConfig.js` 定义油猴脚本元信息
