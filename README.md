# my-blog-api
    - 项目层级化
1. 连接数据库

2. mongoose Schema Model
    - User

    - ArtLearn
    - ArtLife
    - ArtEssays

    - BlogLog

    - FriendLink

3. 路由设计 api
    - users
        /register
        /login?ink=1
            /login-check
            管理员登录
            普通用户登录
        /logout (未完成)

    - articles
        /create
        /delete
        /remove (未完成)
        /update
        /list
        

    - friend-links
        /list
        /create
        /update
        /delete

    - blog-log
        /logs
        /create
        /update
        /delete

# session & cookie
    - npm i koa-generic-session
    - app.js 配置session