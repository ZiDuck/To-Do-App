# To Do App
## Description
- This project contains all api for to do app
## Set up
```bash
# install dependencies
npm install

# create file .env and add content below
DATABASE_URL="postgresql://postgres:duyduyduc18102001@localhost:5432/ToDoApp?schema=public"

PORT=5000

ACCESS_TOKEN_SECRET=123123123asdasd
REFRESH_TOKEN_SECRET=324sfasddasdasd

# migrate db to postgre server
npx prisma migrate dev --name init

# run server
npm run start
```
