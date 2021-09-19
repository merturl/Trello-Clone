# Trello Clone HomeWork

Trello clone homework는 monorepo(client, server)로 구성되어있습니다.

## 주요 기능

- 새로운 리스트 생성
- 새로운 카드 생성
- 리스트 간 카드 이동 (Drag & Drop)
- 유저간 데이터 실시간 동기화 (Web Socket)

## 프로젝트 사용 기술

client-side

- Typescript
- Vanillajs
- Websocket
- HTML,CSS
- Font awesome

server-side

- Typescript
- express
- WS
- ts-node-dev

etc

- concurrently
- live server (vscode extention)

## 실행 방법

```
# install dependency
yarn

# start development
yarn start

# start Production
yarn build
```

## Browser

site is running at `http://localhost:3000`!

## License

Licensed under the MIT License.
