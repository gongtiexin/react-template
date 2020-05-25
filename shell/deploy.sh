#!/usr/bin/env bash

# 若无法执行 运行命令 chmod +x deploy.sh

# 当前时间
date=$(date +%F)
# 编译后资源所在的文件名
dist_name="dist"
# 压缩后的文件名
file_name="dist-${date}.tar.gz"
# 服务器用户名
user=$1
# 服务器地址
host=$2
# 服务器上资源所在的路劲
pwd=$3

# 删除之前的文件
rm -rf *.tar.gz

echo '安装'
yarn

echo '打包'
yarn build

echo '发布'
tar -zcvf ${file_name} ${dist_name}
scp ${file_name} ${user}@${host}:${pwd}
ssh ${user}@${host} "cd ${pwd};tar -zxvf ${file_name} ${dist_name}"

echo "成功"
