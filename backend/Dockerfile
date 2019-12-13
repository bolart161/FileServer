FROM nginx:1.17.5-alpine

RUN mkdir /app
WORKDIR /app

RUN apk add nodejs npm git
RUN rm -rf /var/cache/apk/*

COPY package.json /app
COPY package-lock.json /app
RUN npm i

COPY . /app

RUN mkdir  /var/www/html/files -p
RUN chmod 777 /var/www/html/files

EXPOSE 80
CMD ["node", "/app/server.js"]
