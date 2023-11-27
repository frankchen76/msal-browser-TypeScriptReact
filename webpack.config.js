var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        client: {
            import: "./src/index.tsx"
        }
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/'),
        library: "msal_browser_typescriptreact"
    },
    devtool: "source-map",
    mode: "development",
    devServer: {
        https: {
            key: 'C:\\Tools\\OpenSSL\\localhost\\localhost.key',
            cert: 'C:\\Tools\\OpenSSL\\localhost\\localhost.crt'
        },
        allowedHosts: "all"
    },
    target: "web",
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Test React App',
            // filename: 'dist/index.html',
            template: 'index.html',
            filename: 'index.html',
            chunks: ["client"]
            // Load a custom template (lodash by default)
        })
    ]
};