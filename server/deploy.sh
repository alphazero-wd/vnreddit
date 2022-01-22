#! /bin/hash
heroku container:login
heroku config:set NODE_MODULES_CACHE=false
heroku container:push web --app=vnreddit-api
heroku container:release web --app=vnreddit-api