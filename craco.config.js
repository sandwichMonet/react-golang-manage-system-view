const path = require('path')
module.exports = {
  // webpack配置
  webpack: {
    // 配置别名
    alias: {
      // 使用@表示src目录
      '@': path.resolve(__dirname, 'src')
    }
  }
}
