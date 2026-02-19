const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  const isDev = env.mode === "development";

  return {
    mode: env.mode ?? "development",
    entry: {
      main: path.resolve(__dirname, "src", "index.js"),
    },
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
    devtool: isDev ? "inline-source-map" : false,
    devServer: isDev
      ? {
          port: env.port ?? 3000,
          open: true,
          compress: true,
          hot: true,
          static: {
            directory: path.join(__dirname, "build"),
          },
        }
      : undefined,
    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@app": path.resolve(__dirname, "src/app"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@widgets": path.resolve(__dirname, "src/widgets"),
        "@features": path.resolve(__dirname, "src/features"),
        "@shared": path.resolve(__dirname, "src/shared"),
        "@components": path.resolve(__dirname, "src/components"),
        "@assets": path.resolve(__dirname, "src/assets"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[name].[contenthash][ext]",
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[name].[contenthash][ext]",
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  namedExport: false,
                  auto: (resPath) => Boolean(resPath.includes(".module.")),
                  localIdentName: isDev
                    ? "[path][name]__[local]--[hash:base64:5]"
                    : "[hash:base64:8]",
                },
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      }),
    ],
  };
};
