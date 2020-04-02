# Models

(What's to be saved in BE)

```javascript
    type User {
        username: string;
        email: string;
        firstName?: string;
        lastName?: string;
        cityID: number;
        profileImageURL?: string;
        createdAt: Date;
        rating: number | null;
    }
```

# End Points

## 1. /user [POST]

    creates a user with the given parameters

### required parameters

```javascript
        {
            username: string;
            password: string;
            email: string;
            firstName?: string;
            lastName?: string;
            cityID: number;
        }
```

### return

```javascript
    status code=201
    {
        success: true,
        token: JWT-Token,
        user: {
            username: string;
            email: string;
            firstName?: string;
            lastName?: string;
            country: {
                name: string;
            }
            city: {
                id: number;
                name: string;
            }
            profileImageURL?: string;
            postsCount: number;
            rating: number | null;
        }
    }
```

### error

```javascript
    status code=400
    {
       success: false,
       errorMessage: String
    }
```

## 2. /user/login [POST]

    returns a jwt token for further authentication

### required parameters

```javascript
        {
            username: string,
            password: string
        }
```

### return

```javascript
    status code=200
    {
        same response as /user [POST]
    }
```

### error

```javascript
    status code=401
    {
        success: false,
        errorMessage: "Authentication failed. Please check your email and password"
    }
```

## 3./test [GET]

for testing if authentication is working

## 4. /profile [GET]

Does not require auth header.

### required parameters

```javascript
{
  username: string;
}
```

### return

```javascript
    status code=200
    {
        username: string;
        firstName?: string;
        lastName?: string;
        profileImageURL?: string;
        rating: number | null;
        country: {
            name: string;
        }
        city: {
            id: number;
            name: string;
        }
        profileImageURL?: string;
        postsCount: number;
    }
```

### error

```javascript
    status code=400
    {
        success: false
    }
```

### Required Header

    Authorization=jwt
