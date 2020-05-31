# Node.js 교과서 (조현영 저) 실습 코드 연습 프로젝트

### 목차
| Chapter | 내용 |
| --- | --- |
| 1 | 노드 시작하기 |
| 2 | JavaScript 기본 |
| 3 | 노드 기본기능 |
| 4 | http 모듈로 웹 서버 만들기 |
| 5 | 패키지 매니저 |
| 6 | 익스프레스 웹 서버 |
| 7 | MySQL |
| 8 | MongoDB |
| 9 | 익스프레스 사용하여 SNS 서비스 개발 |
| 10 | 웹 API 서버 |
| 11 | 웹 소켓을 사용하여 실시간 데이터 전송 |
| 12 | 실시간 경매 시스템 |
| 13 | 구글 API로 장소 검색 서비스 개발 |
| 14 | CLI 프로그램 개발 |
| 15 | AWS와 GCP로 배포 |
| 16 | 서버리스 노드 개발 |


### TIP
npm audit

자동 취약점 점검

retirejs

문제가 있는 패키지 점검
```terminal 
$ npm i -g retire
$ retire
```

cross-env

Windows 환경에서 NODE_ENV 설정하여 실행
```terminal
$ npm i -g cross-env && npm i cross-env
```

package.json
```json 
  "start": "cross-env NODE_ENV=production PORT=80 node app"
```

pm2

- 운영환경에서 nodemon 대신 사용
- 서버가 에러로 종료되었을 때 재실행
- 멀티 프로세싱 (멀티 스레딩 아님) : 메모리 공유 안됨(세션 등) => memcached, redis 사용
- 실행, 종료, 모니터링

```terminal
$ pm2 start app.js
$ pm2 list
$ pm2 kill
$ pm2 monit
```

- pm2 클러스터링 : -i 뒤의 숫자는 현재 CPU 코어수 개수 대비 생성할 프로세스 갯수

```terminal
$ pm2 start app.js -i 0
```

morgan

HTTP request logger

winston

로그를 파일이나 DB에 저장

winston-daily-rotate-file

로그를 날짜별로 관리