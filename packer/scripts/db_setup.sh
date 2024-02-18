#!/bin/bash

# init db
sudo postgresql-setup --initdb

# change the longin method in pg_hba.conf
sudo find /var/lib/pgsql/data -name "pg_hba.conf" -exec sed -i 's/ident/scram-sha-256/g' {} +;

# start the service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# create user and database
sudo -u postgres psql -U postgres -c "create user ${DB_USER} with password '${DB_PASSWORD}'"
sudo -u postgres psql -U postgres -c "create database ${DB_NAME} with owner ${DB_USER}"
sudo -u postgres psql -U postgres -c "grant all privileges on database ${DB_NAME} to ${DB_USER}"