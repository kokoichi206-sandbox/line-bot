# line-bot

## [rich menu の変更](https://developers.line.biz/ja/docs/messaging-api/using-rich-menus/)

``` sh
curl -v -X POST https://api.line.me/v2/bot/richmenu \
-H "Authorization: Bearer <token>" \
-H 'Content-Type: application/json' \
-d \
'{
    "size": {
        "width": 2500,
        "height": 1686
    },
    "selected": false,
    "name": "坂道のグループ情報を表示させる。",
    "chatBarText": "Tap to open",
    "areas": [
        {
            "bounds": {
                "x": 0,
                "y": 0,
                "width": 1666,
                "height": 1686
            },
            "action": {
                "type": "uri",
                "label": "櫻坂",
                "uri": "https://sakurazaka46.com/s/s46/diary/blog/list?ima=0000/"
            }
        },
        {
            "bounds": {
                "x": 1667,
                "y": 0,
                "width": 834,
                "height": 843
            },
            "action": {
                "type": "uri",
                "label": "乃木坂",
                "uri": "https://www.nogizaka46.com/s/n46/diary/MEMBER?ima=0025"
            }
        },
        {
            "bounds": {
                "x": 1667,
                "y": 844,
                "width": 834,
                "height": 843
            },
            "action": {
                "type": "uri",
                "label": "日向坂",
                "uri": "https://www.hinatazaka46.com/s/official/diary/member?ima=0000"
            }
        }
    ]
}'

curl -v -X POST https://api-data.line.me/v2/bot/richmenu/richmenu-2db3789f0b2d8564125c9cbd38dec39e/content \
-H "Authorization: Bearer <token>" \
-H "Content-Type: image/png" \
-T sakamichi.png

curl -v -X POST https://api.line.me/v2/bot/user/all/richmenu/richmenu-2db3789f0b2d8564125c9cbd38dec39e \
-H "Authorization: Bearer <token>"
```
