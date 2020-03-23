#End Points


##1. /User [POST] 
    creates a user with the given parameters

###required parameters
```javascript
        {   
            name:string,
            email:string, 
            country:string, 
            password:string
        }
```

###return

```javascript
    status code=201
    {
        success:true
    }
```
###error
```javascript
    status code=400
    {
       success:false
    }
```

##2. /User/login [POST] 
    returns a jwt token for further authentication

###required parameters
```javascript
        {   
            name:string,
            password:string
        }
```

###return

```javascript
    status code=200
    {
        success:true,
        token: string
    }
```
###error
```javascript
    status code=401
    {
        message: "Authentication failed. User not found."||'Authentication failed. Wrong password.'
    }
```

##3./test [GET]
for testing if authentication is working
###Required Header
    Authorization=jwt 

