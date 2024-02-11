# CSYE 6225 Network Structure & Cloud Computing (Spring 2024)

## Build and Deploy instructions

## Assignment 02

### Run on local machine

1. Clone the repository
   ```shell
   git clone https://github.com/CSYE-6225-Cloud-2024/webapp.git
   ```
2. Install all the dependencies
   ```shell
   yarn
   ```
3. Create a .env file in the root directory and add the following
   ```text
   PORT = your_port
   DATABASE_URL = your_database_url
   ```
4. Start the server
   ```shell
   yarn dev
   ```

### Run on centos VM

1. Clone the repository to your system
   ```shell
   git clone https://github.com/CSYE-6225-Cloud-2024/webapp.git
   ```
2. copy zip and unzip the folder to your desired location
   ```shell
   scp -i [your_rsa_key] webapp.zip [user_name]@[vm_ip]:/tmp
   ssh -i [your_rsa_key] [user_name]@[vm_ip]
   ```
3. Install postgres and setup database
   ```shell
   sudo dnf module install postgresql:15/server
   ```
4. Install nodejs
   ```shell
   sudo dnf module install nodejs:20/common
   ```
5. Install yarn
   ```shell
   sudo npm install -g yarn
   ```
6. Install all the dependencies
   ```shell
   yarn
   ```
7. Create a .env file in the root directory and add the following
   ```text
   PORT = your_port
   DATABASE_URL = your_database_url
   ```
8. Start the server
   ```shell
   yarn dev
   ```
9. test

# Reference
