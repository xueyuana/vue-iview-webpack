Unified operation platform 前端项目

## 项目介绍

    前端项目，使用Vue.js + iviewui进行开发。

## 环境部署

### 版本详情：

	node-v6.10.2

### 通过`npm`安装本地服务第三方依赖

	npm install

### 本地启动项目
```
npm run dev
```

### 项目打包

	npm run build

### 打包后的文件

  打包后直接使用Nginx发布dist目录即可。
	 dist
		 --static(静态资源)
		 --index.html (入口html)
