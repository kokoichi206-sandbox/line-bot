import { ImageEventMessage, MessageAPIResponseBase, TextMessage, WebhookEvent } from '@line/bot-sdk';
import { Hono } from 'hono';
import { Buffer } from 'buffer';

type Bindings = {
	DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('*', (c) => c.text('Hi !!'));

app.post('/api/webhook', async (c) => {
	const data = await c.req.json();
	const events: WebhookEvent[] = (data as any).events;

	// @ts-ignore
	const accessToken: string = c.env.CHANNEL_ACCESS_TOKEN;

	await Promise.all(
		events.map(async (event: WebhookEvent) => {
			try {
				await messageEventHandler(event, accessToken, c.env.DB);
			} catch (err: unknown) {
				if (err instanceof Error) {
					console.error(err);
				}
				return c.json({
					status: 'error',
				});
			}
		})
	);
	return c.json({ message: 'ok' });
});

const messageEventHandler = async (
	event: WebhookEvent,
	accessToken: string,
	db: D1Database
): Promise<MessageAPIResponseBase | undefined> => {
	if (event.type !== 'message') {
		return;
	}
	const { replyToken } = event;

	switch (event.message.type) {
		case 'text':
			return textMessageHandler(event.message.text, replyToken, accessToken, db);
		case 'image':
			return imageMessageHandler(event.message, replyToken, accessToken, db);
	}
};

const textMessageHandler = async (
	message: string,
	replyToken: string,
	accessToken: string,
	db: D1Database
): Promise<MessageAPIResponseBase | undefined> => {
	let rep = message + message;

	const response: TextMessage = {
		type: 'text',
		text: rep,
	};
	await fetch('https://api.line.me/v2/bot/message/reply', {
		body: JSON.stringify({
			replyToken: replyToken,
			messages: [response],
		}),
		method: 'POST',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json',
		},
	});

	// db に入れてみるが、特に意味はない。
	const dres = await db.prepare('INSERT INTO messages (item) VALUES (?)').bind(message).run();
	console.log('----- dres -----');
	console.log(dres);

	return;
};

const imageMessageHandler = async (
	message: ImageEventMessage,
	replyToken: string,
	accessToken: string,
	db: D1Database
): Promise<MessageAPIResponseBase | undefined> => {
	// > このエンドポイントは、WebhookイベントオブジェクトのcontentProvider.typeプロパティがlineの場合にのみ利用できます。
	// see: https://developers.line.biz/ja/reference/messaging-api/#getting-content
	if (message.contentProvider.type !== 'line') {
		return;
	}

	const res = await fetch(`https://api-data.line.me/v2/bot/message/${message.id}/content`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	const buffer = Buffer.from(await res.arrayBuffer());
	const base64text = buffer.toString('base64');

	// 5000 文字（~3.4 kB の画像?）が上限。
	const response: TextMessage = {
		type: 'text',
		text: base64text.slice(0, 5000),
	};

	const pien = await fetch('https://api.line.me/v2/bot/message/reply', {
		body: JSON.stringify({
			replyToken: replyToken,
			messages: [response],
		}),
		method: 'POST',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json',
		},
	});

	// const dres = await db.prepare('INSERT INTO messages (item) VALUES (?)').bind(base64text).run();
	// console.log('----- dres -----');
	// console.log(dres);

	return;
};

export default app;
