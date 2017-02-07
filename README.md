# hackernews-react
![hackernews](https://raw.githubusercontent.com/ckinmind/hackernews-react/master/src/images/screenshot.png)
hackners的react实现版，在线访问 [https://ckinmind.github.io/hackernews-react](https://ckinmind.github.io/hackernews-react/)

## 技术栈
- React.js with ES6
- React-Router for routing
- jQuery for ajax
- Webpack for building tool

## 项目说明
- 本项目为学习项目(非原创), 原项目地址 [React-hacker-news](https://github.com/gokulkrishh/React-hacker-news)
- 本项目由Yeoman构建, 基础脚手架使用的是 [generator-react-webpack](https://github.com/react-webpack-generators/generator-react-webpack)
- 本项目对原项目做了诸多修改, 详细查看下面的版本更新
- HackerNews的 [Api参考](https://github.com/HackerNews/API)

## 版本更新
- **[v1.3]**: 样式优化, 目录优化, 详细更新说明 [issue 11](https://github.com/ckinmind/hackernews-react/issues/11)
- **[v1.2]**: 修复bug, 分离出组件复用, 详细更新说明 [issue 8](https://github.com/ckinmind/hackernews-react/issues/8)
- **[v1.1]**: ES6改写, 函数式组件, 优化处理流程, 详细更新说明 [issue 7](https://github.com/ckinmind/hackernews-react/issues/7)
- **[v1.0]**: 原始版本(基本同原项目), 详细更新说明 [issue 5](https://github.com/ckinmind/hackernews-react/issues/5)

## 如何开始
```js
> git clone https://github.com/ckinmind/hackernews-react.git
> cd hackernews-react
> npm install
> npm start
```

## 问题收录
- 关于isMounted()问题, 查看 [issue 3](https://github.com/ckinmind/hackernews-react/issues/3)
- 关于异步ajax在组件销毁后带来的问题, 和isMounted有关，查看 [issue 6](https://github.com/ckinmind/hackernews-react/issues/6)
- 关于单独打包jquery的webpack配置问题, 查看 [issue 10](https://github.com/ckinmind/hackernews-react/issues/10)