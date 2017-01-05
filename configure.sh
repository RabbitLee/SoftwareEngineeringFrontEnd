# update project
git pull origin master

# download nodules
sudo npm install

# restart server
forever stopall
forever start bin/www
