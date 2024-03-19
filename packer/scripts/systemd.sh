#!/bin/bash

# move the service file to the correct location
sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service

# reload the daemon
sudo systemctl daemon-reload

# enable the service
sudo systemctl enable webapp.service