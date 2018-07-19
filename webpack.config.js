const webpack = require('webpack');
const packageInfo = require('./package.json');
const banner  =
    " Vuedals plugin v" + packageInfo.version + "\n" +
    "\n" +
    " Multiple event based modal windows, with a single component\n" +
    "\n" +
    " This is a plugin to open any number of modal windows without having to attach them to the DOM\n" +
    " @author "+ packageInfo.author.name +" <"+ packageInfo.author.email +">\n" +
    " "+ packageInfo.homepage +"\n" +
    " Released under the MIT License.";

module.exports = {
    entry: './src/main.js',

    output: {
        path: './dist/',
        filename: 'vuedals.js',
        library: 'Vuedals',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: __dirname,
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.s[a|c]ss$/,
                loader: 'style!css!sass'
            }
        ]
    },

    vue: {
        loaders: {
            scss: 'css-loader!sass-loader'
        }
    },

    resolve: {
        extensions: ['', '.js', '.vue'],

        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },

    plugins: [
        new webpack.BannerPlugin(banner),
         new webpack.optimize.UglifyJsPlugin({
            minimize: false,
            sourceMap: false,
            mangle: false,
            compress: {
                warnings: false
            },
            output: {
                comments: true
            }
        })
    ]
};