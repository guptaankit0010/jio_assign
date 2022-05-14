# jio_assign

# Server
# Run below commands

cd server
node index.js

This will run api server on port 3000

# Hosted server on EC2

http://3.110.114.13:3000/

# Client Side

# Run below commands

# For local environment , use below cmd

ENV="dev" node index.js 10
"10" is the number of pages to hit

This will hit or post data to http://localhost:3000

# For hosted ec2 environment , use below cmd
node index.js 10

