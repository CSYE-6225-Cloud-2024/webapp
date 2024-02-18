#!/bin/bash

# create a service file
sudo tee /etc/systemd/system/webapp.service > /dev/null << EOF
[Unit]
Description=CSYE 6225 App
After=network.target

[Service]
Type=simple
User=csye6225
Group=csye6225
WorkingDirectory=/opt/webapp
ExecStart=yarn start
Restart=always
RestartSec=3
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=csye6225

[Install]
WantedBy=multi-user.target
EOF

# reload the daemon
sudo systemctl daemon-reload

# enable the service
sudo systemctl enable webapp.service