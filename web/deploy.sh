#! /bin/hash
heroku login
docker ps
heroku container:login
heroku container:push --app=vnreddit-app web
heroku container:release --app=vnreddit-app web