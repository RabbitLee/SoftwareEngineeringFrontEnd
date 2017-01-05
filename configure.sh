# update project
git pull origin master

# restart server
forever stopall
forever start bin/www
