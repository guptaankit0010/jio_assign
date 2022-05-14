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


# Sample apis

http://3.110.114.13:3000/jobs -> This will fetch 10 nodejs jobs from all data with latest first
http://3.110.114.13:3000/jobs?location=mum --> This will fetch 10 nodejs jobs from all data where location string contains "mum" with latest first

http://3.110.114.13:3000/jobs?location=mum&page=3 --> This will fetch  10 nodejs jobs from page 3 and onwards upto last page for location "mum" without any ordering

http://3.110.114.13:3000/jobs?location=mum&page=3&limitToPage=true --> This will fetch nodejs jobs from page 3 only for location "mum" without any ordering


    