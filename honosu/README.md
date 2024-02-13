https://github.com/cloudflare/workers-sdk

``` sh
npx wrangler init honosu -y

npm install -D @line/bot-sdk
npm install -g wrangler

wrangler secret put CHANNEL_ACCESS_TOKEN
npm run deploy
```

## Links

- [CloudFlare Workers、Cloudflare D1、HonoでLINE botを作りました](https://tkancf.com/blog/creating-line-bot-with-cloudflare-workers-d1-and-hono/)
