# browser-extension-react-ts

browser extension template

## 技术栈

React、TypeScript、Vite、Less

## webextension-polyfill

使用基于 `webextension-polyfill` 封装的工具库提供的 `API` 代替 `浏览器 API` ，消除浏览器之间的差异。

## 安装

```
pnpm install
```

## 开发

```
pnpm dev
```

## 调试

1. 执行 `pnpm watch` 命令监听 `src` 相关文件变化并自动执行构建命令

2. 将 dist 目录的构建产物导入 chrome 拓展程序进行调试

## 构建

```
pnpm build
```
