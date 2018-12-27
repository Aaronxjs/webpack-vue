module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
    // 使用非默认的 babel-eslint 作为代码解析器
    // 这样 eslint 就能识别 babel 语法的代码
    parser: 'babel-eslint',
    // required to lint *.vue files
    // 用于检查 *.vue 文件的代码
    plugins: [
        'html'
    ]
};