#FROM  node:16.20.0-alpine as node
#
#WORKDIR /usr/chat
#
#COPY ./package.json .
#
#RUN npm config set registry https://registry.npmmirror.com && npm install @vue/cli-service --save-dev --force
#
#RUN npm install --force
#
#COPY . .
#
#RUN vue-cli-service build

FROM nginx:stable-alpine

COPY ./dist /usr/share/nginx/html/dist

COPY ./nginx/nginx.conf /etc/nginx/conf.d/chat.conf
