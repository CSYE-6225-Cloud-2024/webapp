#!/bin/bash

# Install packages
sudo dnf module install -y postgresql:15/server
sudo dnf module install -y nodejs:20/common
sudo dnf install unzip -y
curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
sudo dnf install yarn -y