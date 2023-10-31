 const path = require("path");
 const HtmlWebpackPlugin = require("html-webpack-plugin");
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
 const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
 const TerserPlugin = require("terser-webpack-plugin");
 const PostCssPresetEnv = require("postcss-preset-env");
 const CopyPlugin = require("copy-webpack-plugin");
 const mode = process.env.NODE_ENV || "development";
 const devMode = mode === "development";
 const target = devMode ? "web" : "browserslist";
 const devtool = devMode ? "source-map" : undefined;

 module.exports = {
	mode,
  target,
  devtool,
	devServer: {
		port: 3001,
		open: true,
		hot: true,
	},
	entry: path.resolve(__dirname, "src", "index.js"),
	output: {
    path: path.resolve(__dirname, "dist"),
		clean: true,
    filename: "main.js",
  },
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src", "index.html")
		}),
		new MiniCssExtractPlugin({
			filename: "main.css",
    }),
		new CssMinimizerPlugin(),
		new TerserPlugin(),
		new CopyPlugin({
      patterns: [
        { from: "./src/img/banners", to: "assets" },
      ],
    }),
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
        test: /\.(c|sa|sc)ss$/i,
        use: [
					devMode ? "style-loader" : MiniCssExtractPlugin.loader, 
					"css-loader", 
						{
							loader: "postcss-loader",
							options: {
								postcssOptions: {
									plugins: [PostCssPresetEnv]
								},
							},
						},
						"sass-loader",
					],
      },
			{
				test: /\.(woff?2|ttf)$/i,
				type: "asset/resource",
				generator: {
					filename: "assets/[name][ext]"
			}},
			{
				test: /\.(jpe?g|png|webp|gif|svg)$/i,
				type: "asset/resource",
				generator: {
					filename: "assets/[name][ext]"
			}
			},{
				test: /\.(?:js|mjs|cjs)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							["@babel/preset-env", { targets: "defaults" }]
						],
						
					}
				}
			}
		],
	},
	optimization: {
    minimizer: [
			new TerserPlugin({}), 
			new CssMinimizerPlugin({}),
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						plugins: [
							['gifsicle', { interlaced: true }],
							['jpegtran', { progressive: true }],
							['optipng', { optimizationLevel: 5 }],
							['svgo', { name: 'preset-default' }],
						],
					},
				},
			})
		]
  }
 }
 