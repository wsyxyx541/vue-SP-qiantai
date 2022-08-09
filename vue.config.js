//如果需要覆盖webpack的配置，可以在vue.config.js文件，覆盖webpack配置文件
// const { defineConfig } = require("@vue/cli-service");
module.exports = {
  transpileDependencies: true,
  lintOnSave: false,
  //当最后打包的时候，不生成map文件
  productionSourceMap: false,
  //开启代理服务器(方式二)
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        ws: true, // 启用 websocket 代理
        changeOrigin: true, //用于控制请求头中的host值
      },
    },
  },
};
