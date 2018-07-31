# Video Game Store

A remake of the video game store using React and Redux<br>
Original project: https://github.com/MahmoudKhaledAli/Video-Game-Store

### To run use 2 seperate terminals:
You need to run the server seperately for both the admin and client UIs.
#### Database setup:
Install MySQL and run the DatabaseSchema.sql file to create the database schema.
#### Client:
```
> cd client
> npm run start
```
#### Server:
```
> cd server
> npm run start
```
#### Admin:
```
> cd admin
> npm run start
```

### Note:
You need to create a file config.js in the server directory, and have it export a secret string for authentication, eg:
```
module.exports = {
  secret: 'xxxxx'
}
```
