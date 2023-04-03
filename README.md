# sparkle-Chat-GPT

### 安装依赖
```
npm install --force
```

### 编译前端
```
vue-cli-service build
```

### 在docker中启动
```
docker-compose -f docker-compose.yml up -d
```

### 在浏览器打开
```
http://127.0.0.1:80
```

### 修改配置
```
打开docker-compose.yml：
    1. openapi 密钥：   OEPNAPI_KEY
    2. 前端访问密钥： CHAT_SECRET
```

