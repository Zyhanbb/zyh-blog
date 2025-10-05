# zyh-blog

这是一个基于 **React**、**TypeScript** 和 **Vite** 构建的个人博客项目，支持现代前端开发的最佳实践，包括模块热更新（HMR）、类型检查、代码风格校验等。

可以进入网站[https://zhengyihan.com/ ](https://zhengyihan.com/)查看整个项目效果

## 项目特性

- ⚡️ 使用 Vite 作为构建工具，开发体验极佳
- 🛠️ 使用 TypeScript 提升代码可维护性和可靠性
- ⚛️ 基于 React 进行组件化开发
- 🎨 支持全局样式与组件级样式
- 🧩 结构清晰，便于扩展和维护
- 🔍 集成 ESLint 进行代码质量检查

## 目录结构

```
zyh-blog/
├── public/                # 静态资源目录
│   ├── sun.svg
│   └── vite.svg
├── src/                   # 源码目录
│   ├── assets/            # 图片等静态资源
│   ├── components/        # 复用组件
│   ├── contexts/          # React 上下文
│   ├── pages/             # 页面组件
│   ├── styles/            # 全局样式
│   ├── App.tsx            # 应用入口组件
│   ├── main.tsx           # 应用挂载入口
│   └── index.css          # 全局 CSS
├── index.html             # HTML 模板
├── package.json           # 项目依赖与脚本
├── tsconfig.json          # TypeScript 配置
├── vite.config.ts         # Vite 配置
├── eslint.config.js       # ESLint 配置
└── README.md              # 项目说明
```

## 详细介绍

引导页面（关于生日的页面）主要功能是参考的 [网站React Bits]([React Bits - Animated UI Components For React](https://www.reactbits.dev/text-animations/split-text))

包括海洋球（[ballpit](https://www.reactbits.dev/backgrounds/ballpit)）、点击进入按钮（[magnet](https://www.reactbits.dev/animations/magnet)）、欢迎文字（[decrypted-text](https://www.reactbits.dev/text-animations/decrypted-text)）、

鼠标轨迹展示照片（[image-trail](https://www.reactbits.dev/animations/image-trail)）

个人介绍页面主要亮点为：可进行**中英文**主题切换、**亮色暗色**主题切换、以及**自适应屏幕大小**



本静态页面通过GitHub Pages服务托管，并配置自定义域名解析。

个人主页非本人，该项目以及域名是作为生日礼物送给好朋友的。

有任何问题，欢迎交流。本人邮箱：1275675187@qq.com
