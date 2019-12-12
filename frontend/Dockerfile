FROM nginx:1.17.5-alpine

RUN mkdir /app
WORKDIR /app

RUN apk add nodejs npm git
RUN rm -rf /var/cache/apk/*

COPY package.json /app
COPY package-lock.json /app
RUN npm i

COPY . /app

RUN rm -rf /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/nginx.conf

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

RUN npm run build

RUN rm -rf ./node_modules

EXPOSE 80