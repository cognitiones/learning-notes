# 疑难杂症

## 本地 Node 服务 局域网内访问不到

window 11 解决方案

检测防火墙 尝试关闭后 是否可以正常访问

如果可以 则使用 暴露对外端口

![image-20240630222905362](http://cdn.chen-zeqi.cn/image-20240630222905362.png)

点击高级设置

![image-20240630223002810](http://cdn.chen-zeqi.cn/image-20240630223002810.png)

点击入站规则

![image-20240630223021937](http://cdn.chen-zeqi.cn/image-20240630223021937.png)

点击新建规则

![image-20240630223059335](http://cdn.chen-zeqi.cn/image-20240630223059335.png)

点击端口 =》下一步

![image-20240630223146210](http://cdn.chen-zeqi.cn/image-20240630223146210.png)

输入想要暴露的端口 =》 下一步

![image-20240630223212750](http://cdn.chen-zeqi.cn/image-20240630223212750.png)

选择允许连接 =》下一步

![image-20240630223231427](http://cdn.chen-zeqi.cn/image-20240630223231427.png)

选择应用规则 即可完成

此时，你应该能在 开启防火墙时 仍能够访问服务。