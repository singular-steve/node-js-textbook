# MySQL

### docker 로 MySQL 실행

``` bash
$ docker run --name mysql -p 3306:3306 -d \
-e MYSQL_ROOT_PASSWORD=password \
-e MYSQL_USER=rawcoder \
-e MYSQL_PASSWORD=password \
-e MYSQL_DATABASE=nodejs \
-d mysql
```