#!/bin/bash

sudo mkdir /var/log/webapp

sudo mv /tmp/config.yaml /var/log/webapp/config.yaml

sudo chown -R csye6225:csye6225 /var/log/webapp

sudo systemctl daemon-reload

sudo systemctl enable google-cloud-ops-agent


