#!/bin/bash

# 第一引数としてDockerファイルのパスを受け取る
dockerfile_path=$1

# 引数で指定されたパスを使用してDockerイメージをビルド
docker build -t my-node-app -f $dockerfile_path .

# ビルドが成功したかどうかを確認
if [ $? -ne 0 ]; then
  echo "Docker build failed."
  exit 1
fi

# コンテナをデタッチモードで起動し、コンテナIDを取得
container_id=$(docker run -d my-node-app)

# コンテナIDが空でないことを確認
if [ -z "$container_id" ]; then
  echo "Failed to start the container."
  exit 1
fi

echo "Container started with ID: $container_id"

# コンテナの起動を待つ（例: 10秒待機）
sleep 10

# アプリケーションが起動しているかどうかを確認
if ! docker logs $container_id ; then
  echo "Application did not start successfully."
  exit
fi

# コンテナの停止と削除
docker stop $container_id
docker rm $container_id

echo "Test completed successfully."
