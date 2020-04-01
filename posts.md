# Models

(What's to be saved in BE)

```javascript
    type Post {
      authorID: number; // User ID
      cityID: number;
      title: string;
      text: string;
      imageURL?: string;
      createdAt: Date;
      rating: number;
    }
```

# End Points

## 1. /posts [GET]

Does not require auth header.

### required parameters:

```javascript
{
  category: 'news' | 'medical_supply' | 'grocery' | 'advice';
  cityID: number;
}
```

### return

```javascript
    status code=200
    {
      author: {
        first_name?: string;
        last_name?: string;
        username: string;
        profileImageURL?: string;
      }
      title: string;
      text: string;
      imageURL?: string;
      createdAt: Date;
      rating: number;
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
