# wepy_skeleton
根据日常使用wepy开发小程序  总结提炼出来的的项目框架 免去每次捣鼓重复代码的麻烦

# 目录结构
```
.
├── README.md
└── wepy_skeleton
    ├── package.json  // 配置启动脚本 (debug/dev/build)
    ├── project.config.json
    ├── src
    │   ├── app.wpy
    │   ├── common
    │   │   ├── animate.wxss  // 动画支持
    │   │   ├── api.js  // 所有api
    │   │   ├── collectFormId.js  // 收集formId
    │   │   ├── common.js  // 封装一些公用方法
    │   │   ├── decorator.js  // 封装trycatch装饰器 实现对函数的错误监控
    │   │   ├── http.js  // 封装小程序request请求
    │   │   └── storage.js  // 封装storage为promise
    │   ├── components
    │   │   └── Modal.wpy  // 错误弹窗
    │   └── pages
    │       └── index.wpy  // 引入装饰器trycatch 配置错误处理handleError
    └── wepy.config.js  // 配置rootURL  配置Less autoprefix  配置drop_console drop_debugger
```
