### 要解决虾米问题？
可能你的H5分享链接是酱紫的：

![在钉钉里的分享](https://img.alicdn.com/tfs/TB1vKWAftfJ8KJjy0FeXXXKEXXa-516-308.png)

也可能是酱紫的：

![在微信里的分享](https://img.alicdn.com/tfs/TB1_ky.fr_I8KJjy1XaXXbsxpXa-481-195.jpg)

### 因此我们需要让H5分享链接变成酱紫:
![高颜值分享效果图](https://img.alicdn.com/tfs/TB1gUuSfxrI8KJjy0FpXXb5hVXa-750-1303.jpg)

### 如何使用呢？

#### 第一步：引入share-twice：
> 通过`<script charset="utf-8" src="./share-twice.js"></script>`引入

不管哪种方式，在全局都会有一个ShareTwice的全局对象，那接下来就可以配置分享文案、描述、图片、链接啦

#### 第二步：配置分享文案、描述、图片、链接等
> 方式一（简洁方式）：通过<meta>标签注入
```html
  <meta name="shareTitle" content="需要分享的Title">
  <meta name="shareDesc" content="需要分享的描述内容">
  <meta name="shareLink" content="https://newconnection.cainiao.com/cn/test/liyoutest.html">
  <meta name="shareImage" content="https://gw.alicdn.com/tfs/TB1UlBCNXXXXXXCXXXXXXXXXXXX-97-97.png">
  <meta name="shareAuto" content="true">
```

> 方式二（支持分享后的回调）：通过ShareTiwce.config()进行配置
```js
  <script>
    shareTwice.config({
      title: '需要分享的Title',
      desc: '需要分享的描述内容',
      link: 'https://newconnection.cainiao.com/cn/test/liyoutest.html',
      image: 'https://gw.alicdn.com/tfs/TB1864sQpXXXXaaXpXXXXXXXXXX-35-40.png',
      successFun: function() {
        // 分享成功后的回调函数
        alert("share-twice: success");
      },
      failFun: function() {
        // 分享取消或失败后的回调函数
        alert("share-twice: cancel");
      }
    });
  </script>
```

### 注意事项

1. shareTwice.config中的配置高于`<meta>`标签中的配置项
2. shareTitle默认为`<title>`标签中的值
3. shareLink默认为`document.location.href`
4. shareImage默认值为`https://gw.alipayobjects.com/zos/rmsportal/PbxcajsXkcfiWIYdRxaw.jpg`
5. shareAuto默认值为false 若不设置为true需要调用`shareTwice.config({})`进行初始化