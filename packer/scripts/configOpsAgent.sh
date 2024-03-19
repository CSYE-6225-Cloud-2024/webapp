#!/bin/bash

sudo mkdir /var/log/webapp

sudo mv /tmp/config.yaml /etc/google-cloud-ops-agent/config.yaml

sudo chown -R csye6225:csye6225 /var/log/webapp

sudo systemctl daemon-reload

sudo systemctl enable google-cloud-ops-agent


