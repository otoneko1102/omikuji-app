const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: [],
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'おみくじ',
    },
  },
});
