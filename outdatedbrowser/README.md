## 安装组件 
```
cnpm install @cathay/outdatedbrowser
```

## 引入组件
```
import outdatedbrowser from "@cathay/outdatedbrowser";
import "@cathay/outdatedbrowser/index.css";

outedatedBrowser({
    mode:'chrome'
});
```

## 参数配置
```
mode：chrome //非chrome浏览器会全屏提示升级，提示不可关闭
mode：/IE11/IE10/IE9/IE8 //IE*以下版本的浏览器提示升级

outedatedBrowser({
    mode:'chrome' 
});

outedatedBrowser({
    mode:'IE11' 
});
```
## 样式交互见examples