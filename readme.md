# End Points


## 1. /user [POST] 
    creates a user with the given parameters

### required parameters
```javascript
        {   
            username:string,
            email: string,
            name: string,
            password: string,
            country: string,
        }
```

### return

```javascript
    status code=201
    {
        success:true,
        token: JWT-Token,
        user:{
            "_id": String,
            "username": String,
            "name": String,
            "country": String,
            "email": String,
            "createdAt": Date,
        }
    }
```
### error
```javascript
    status code=400
    {
       success:false,
       errorMessage:String
    }
```

## 2. /user/login [POST] 
    returns a jwt token for further authentication

### required parameters
```javascript
        {   
            username:string,
            password:string
        }
```

### return

```javascript
    status code=200
    {
        success:true,
        token: JWT-Token,
        user:{
            "_id": String,
            "username": String,
            "name": String,
            "country": String,
            "email": String,
            "createdAt": Date,
        }
    }
```
### error
```javascript
    status code=401
    {
        success: false, 
        errorMessage:"Authentication failed.Please check your email and password"
    }
```

## 3./test [GET]
for testing if authentication is working
### Required Header
    Authorization=jwt 


