#!/bin/bash
is_mysql_init=true
if [ ! -d "/var/lib/mysql/mysql" ]; then
    is_mysql_init=false
    echo "---DATABASE INSTALL BLOCK---"
    mariadb-install-db
fi

echo "---START mariadbd---"
mariadbd -u root &
sleep 3

if [ "$is_mysql_init" = false ]; then
    echo "---DATABASE INIT BLOCK---"
    mysql -u root < /usr/src/app/init_db.sql
fi

npm start

tail -f /dev/null