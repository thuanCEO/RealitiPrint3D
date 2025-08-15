const path = require("path");

module.exports = {
    webpack: {
        alias: {
            "@app": path.resolve(__dirname, "src/app"),
            "@assets": path.resolve(__dirname, "src/assets"),
            "@components": path.resolve(__dirname, "src/components"),
            "@features": path.resolve(__dirname, "src/features"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@routers": path.resolve(__dirname, "src/routers"),
            "@services": path.resolve(__dirname, "src/services"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@layouts": path.resolve(__dirname, "src/layouts")
        },
    },
    eslint: {
        enable: false, // ✅ tắt eslint khi build
    },
};
