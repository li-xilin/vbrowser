# V-Browser

V-Browser 是一个前端基于Vue3、后端基于Nodejs实现文件浏览器，可以浏览文本、图像、视频、音频、PDF和Office word 2007等格式的文件。

## Install

1. 进入app目录安装依赖并编译，将编译后的dist放到系统的指定位置;
2. 进入server目录安装依赖，并将其放到系统的指定目录;
3. 正确编辑Nginx配置文件`nginx.vbrowser.conf`，将其加入到系统Nginx配置目录;
4. 正确编辑Systemd配置文件`vbrowser.service`，将其加入到systemd系统服务配置目录，通常为`/etc/systemd/system`目录;
5. 启动`vbrowser`服务，重新加载Nginx配置。

## License

[MIT](./LICENSE)
