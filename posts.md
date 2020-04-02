# Models

(What's to be saved in BE)

```javascript
    type Post {
      postID: number;
      authorID: number; // User ID
      cityID: number;
      title: string;
      text: string;
      imageURL?: string;
      createdAt: Date;
      rating: number | null;
      category: Array<'news' | 'medical_supply' | 'grocery' | 'advice'>
    }
```

# End Points

## 1. /posts [GET]

Does not require auth header. _But_, if there is one, the field `userCanVote` should be set to either true or false.

### required parameters:

```javascript
{
  category: 'news' | 'medical_supply' | 'grocery' | 'advice';
  cityID: number;
}
```

### return

```javascript
    status code=200;
    posts: {
      [postID: number]: {
        author: {
          first_name?: string;
          last_name?: string;
          username: string;
          profileImageURL?: string;
        }
        title: string;
        text: string;
        imageURL?: string;
        createdAt: number;
        rating: number | null;
        userCanVote: boolean;
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

## 2. /own-posts [GET]

Requires auth header. Delivers an array of post IDs posted by the user.

### return

```javascript
    status code=200
    postIDs: number[]
```

### error

```javascript
    status code=400
    {
       success: false,
       errorMessage: String
    }
```
