https://github.com/cloudflare/workers-sdk

``` sh
npx wrangler init honosu -y

npm install -D @line/bot-sdk
npm install -g wrangler

wrangler secret put CHANNEL_ACCESS_TOKEN
npm run deploy
```

## D1

``` sh
wrangler d1 create line-bot

# local db
wrangler d1 execute line-bot --local --file=./migrations/01_create.sql
wrangler d1 execute line-bot --local --command="INSERT INTO messages (item) VALUES ('pien');"
wrangler d1 execute line-bot --local --command='SELECT * FROM messages;'

# cloud!
wrangler d1 execute line-bot --file=./migrations/01_create.sql
wrangler d1 execute line-bot --command='SELECT * FROM messages;'
```

## Links

- Messaging APIリファレンス
  - https://developers.line.biz/ja/reference/messaging-api/#wh-image
- 画像
  - 別コンテントとして取得が必要そう
  - https://developers.line.biz/ja/reference/messaging-api/#get-content
- [CloudFlare Workers、Cloudflare D1、HonoでLINE botを作りました](https://tkancf.com/blog/creating-line-bot-with-cloudflare-workers-d1-and-hono/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
