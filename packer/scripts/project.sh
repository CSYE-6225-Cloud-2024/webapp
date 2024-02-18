#!/bin/bash

# copy over the files
cd /opt
sudo cp -r /tmp/webapp.zip .

# unzip the file
sudo unzip webapp.zip
sudo rm -f webapp.zip

# install the 
cd webapp
sudo yarn

# setup the env
sudo tee .env > /dev/null << EOF 
PORT=3000
DB_NAME=${DB_NAME}
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASSWORD}
EOF

# change user
sudo chown -R csye6225:csye6225 /opt/webapp
