module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        // "airbnb",
        "plugin:prettier/recommended",
        "plugin:react/jsx-runtime",
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    },
};
