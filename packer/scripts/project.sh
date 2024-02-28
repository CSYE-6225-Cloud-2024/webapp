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

# change user
sudo chown -R csye6225:csye6225 /opt/webapp
