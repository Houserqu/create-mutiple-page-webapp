# create-mutiple-page-webapp

愉快的开发多 html 页面应用

## About

有些时候，前端开发不一定都是单页应用，而是传统多 html 页面，然后将这些页面交给后端进行部署，也可以理解为多页应用的前后端分离开发。这种类型的项目是以多个 html 文件为入口的，所以基于 React 等项目构建方式不太适用，因为 webpack 是以 js 文件为入口的。

所以为了能够用 typescript、less 等高级语法编写这种类型的项目，又能很好兼容浏览器，我搭建了一个基于 gulp 的脚手架.

## Install

### get code

```bash
git clone --depth 1 https://github.com/Houserqu/create-mutiple-page-webapp
```

### install dependence

`yarnpkg` or `npm i`

## Deployment

### 开发模式

使用 `npm start` 命令会在本地启动开发服务器，当代码文件变动时会自动更新。

### 构建

使用 `npm run build` 命令构建代码到 dist 目录

## Built With

- [gulp](https://gulpjs.com/) 构建工具
- [Typescript](https://github.com/Microsoft/TypeScript) js 语言版本
- [Less](https://github.com/less/less.js) css 预处理器
- [ejs](https://github.com/mde/ejs) html 模板引擎
- [html5-boilerplate](https://github.com/h5bp/html5-boilerplate) 前端文件模板

## Contributing

欢迎 PR

## Authors

- [瞿浩 Houser Qu](http://houserqu.com/) - _Initial work_

## License

[MIT licensed](https://github.com/Houserqu/create-mutiple-page-webapp/blob/master/LICENSE)
