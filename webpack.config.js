import path from "path";
import webpack from "webpack";
import fs from "fs";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = path.resolve();

const devConfig = {
    entry: "./src/index.ts",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        ...(fs.existsSync("./test") ? fs.readdirSync("./test").map((file) => {
            console.log(file)
            if (file.endsWith(".html")) {
                return new HtmlWebpackPlugin({
                    filename: file,
                    template: `./test/${file}`,
                });
            }
        }) : []),
    ],
};

export default (env, argv) => {
    if (argv.mode === "production") {
        return {
            entry: "./src/index.ts",
            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: "ts-loader",
                                options: {
                                    transpileOnly: true
                                }
                            }
                        ]
                    },
                ],
            },
            resolve: {
                extensions: [".ts", ".js"],
            },
            output: {
                filename: "bundle.min.js",
                path: path.resolve(__dirname, "dist"),
            },
            optimization: {
                minimize: false,  // 不压缩，生成可读 JS
            },
        };
    } else return devConfig;
};