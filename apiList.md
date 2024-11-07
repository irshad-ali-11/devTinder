
### Dev Tinder API LIST

## authRouter
- POST/singup
- POST/login
- POST/logout

## profileRouter
 - GET/profile/view
 - PATCH/profile/edit
 - PATCH/profile/edit/password

 ## connectionRequetRouter
 - POST/request/send/:status/:userId
 - POST/request/review/:status/:requestId

 ## userRouter
  - GET/user/requests/receive
  - GET/user/connections
  - GET/user/feed - Gets you the profile another user

  - Status - accepted,rejected, ingnored,interested 
