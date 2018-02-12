## 前端项目模板 ![node](https://img.shields.io/badge/node-require-yellow.svg) ![yarn](https://img.shields.io/badge/yarn-require-yellow.svg)

## eslint

```
npm run eslint
```

或者配置IDE的eslint

## 运行

```
npm run dev
//DEV_PROXY=localhost yarn run dev_recommend-system
```

## 打包

```
npm run build
```

## nginx配置(参考)

```
upstream develop.local {
    server 127.0.0.1:00000;
}

server {
    listen       80;
    server_name  develop.com www.develop.com;

    charset  utf-8;
    gzip on;
    gzip_types application/javascript text/html text/css;
    client_max_body_size  250m;
    #access_log  /var/log/nginx/log/host.access.log  main;
    #add_header Cache-Control no-cache;
    #add_header Pragma: no-cache;
    #add_header Expires: -1;

    root  /home/hldev/hldata/frontend/fe-template/dist;
    location / {
        try_files $uri /index.html =404;
    }

    location /api {
        proxy_pass http://develop.local;
    }

    error_page  404  /static/html/404/404.html;
}
```

## iconfont
本模板中有2个字体包:ant-design,material-design,用法参考官网([antd](https://ant.design/components/icon-cn/),[md](https://material.io/icons/))

## Server-Side Rendering

```js
Loadable({
  loader: () => import('./Component'),
  modules: ['./Bar'],
  webpack: () => [require.resolveWeak('./Bar')],
});
```