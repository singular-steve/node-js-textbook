# MongoDB

### docker 로 MongoDB 실행

``` bash 
$ docker run \
--name mongodb \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=rawcoder \
-e MONGO_INITDB_ROOT_PASSWORD=password \
-e MONGO_INITDB_DATABASE=nodejs \
-d mongo
```