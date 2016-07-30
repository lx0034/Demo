#!/bin/bash
# 用于jenkins构建调用
# 使用方法
# sh build.sh 
# author zhangnanconan
#

# nodejs所在目录
export PATH=/usr/local/nodejs/bin:$PATH
set -e

PROJECT_ROOT=$(cd `dirname $BASH_SOURCE[0]`/ && pwd)

# 发布目录
OUTPUT_FOLBER=$PROJECT_ROOT"/output"

# 进入项目仓库根目录
cd $PROJECT_ROOT

# 删除原有发布目录
if [ -e $OUTPUT_FOLBER ]; then
	rm -r $OUTPUT_FOLBER
fi

didi -v | grep 'v'
didi release -mopcuD -d local

if [ -e $OUTPUT_FOLBER/page ] && [ -e $OUTPUT_FOLBER/static ]; then
	find $OUTPUT_FOLBER -name '*' -type f
	echo "请将<$OUTPUT_FOLBER/page>(不包含此文件夹)里面的文件文件打成一个rpm包"
	echo "请将<$OUTPUT_FOLBER/static>(不包含此文件夹)里面的文件夹打成一个rpm包"
else
	exit 1
fi




