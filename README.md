# Social network
! There's no deploy on the remote server - couldn't find a free one with sockets support. 'static' folder is not in .gitignore for this reason.
Remote db is enabled.
## Goals
1. Learn NestJs basics
2. Create a multi-layer backend architecture
3. Learn websockets
4. Practice React, Typescript, Postgresql, nodejs
### Repository
https://github.com/ElizavetaPanasiuk/social-network
### Pull request
https://github.com/ElizavetaPanasiuk/social-network/pull/1
### How to run an app:
link to env files: https://drive.google.com/file/d/1qeFvDHWeCHmOmCWaVlHsPV4snpIXh39b/view?usp=sharing
1. Add .env to frontend folder
2. Add .development.env to backend folder
3. Run frontend: cd frontend -> npm run dev
4. Run backend: cd backend -> npm run start:dev 

### Emails to sign in (or register with your or some random email) (password for all the existing users - Admin123)
- lizaveta.panasiuk@mail.com
- andrew.smith@mail.com
- alex.petrov@mail.com
- ivan.ivanov@mail.com
- nick.taylor@mail.com

## Swagger documentation
http://localhost:5000/api/

## Functionality
1. Registration (passwords are stored as hashes)
2. Login
3. Switch language (RU, EN) (Sidebar -> Settings), or Select in the top right corner for unauthorized users
4. Profile (yours):
- view a profile
- view posts
- create new posts
- edit posts
- remove posts
- like / dislike posts
- open post pages
- go to subscriptions / subscribers page (click on 'Subscribers' or 'Subscription' link in the profile description)
4. Profile (of other users)
- view a profile
- view posts
- like/dislike posts
- start messaging (click "Message")
- subscribe / unsubscribe
5. Post (click on the post)
- edit a post (if yours)
- remove a post (if yours)
- like / dislike a post
- add comments
- like comments
6. Search
- search users using filters by country / city, search string (for firstName and lastName)
7. News
- view new posts of the profiles you're following
8. Messages
- a list of your conversations
- click on a conversation and go to the chat with other user
- messages are stored in an encrypted manner
9. Settings
- Common settings: Change language, sign out
- Profile settings: edit profile data
- Password settings: update your password