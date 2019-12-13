# FileServer
Server for upload and download file
+ backend - server part: Node.js application
+ fronted - directory of front-end: Vue.js application (SPA)
+ docker-compose - config for docker compose by Dockerfiles in front and back side
+ need node v12.13.0 (npm v6.12.0)
### Build
```shell
docker-compose -p filebase -f docker-compose.yml -f docker-compose.develop.yml up -d --force-recreate --build
```
### Demo Version
#### <a href="http://bolart.ru">Go to site</a>
