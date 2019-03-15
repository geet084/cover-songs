# Cover Songs

## Endpoints

### Songs

#### Get all songs:
```GET /api/v1/songs```
#### Get one specific song:
```GET /api/v1/songs/:id```
#### Add new song(s):
```POST /api/v1/songs```

### Covers
#### Get all songs:
```GET /api/v1/covers```
#### Get one specific cover:
```GET /api/v1/covers/:id```
#### Add new cover(s):
```POST /api/v1/covers```

### Shared
#### Remove a specific song/cover:
```DELETE /api/v1/:db/:id```

## Sample Responses
### Endpoint:  ```GET /api/v1/songs```
#### Parameters: none
#### Response:
```
[
    {
        "id": 26,
        "song": "Respect",
        "original_artist": "Otis Redding",
        "release_year": 1965,
        "created_at": "2019-03-13T16:06:17.771Z",
        "updated_at": "2019-03-13T16:06:17.771Z"
    },
    {
        "id": 27,
        "song": "Cocaine",
        "original_artist": "J.J. Cale",
        "release_year": 1976,
        "created_at": "2019-03-13T16:06:17.776Z",
        "updated_at": "2019-03-13T16:06:17.776Z"
    },
    ...
]
```
### Endpoint:  ```GET /api/v1/songs/:id```
#### Parameters: none
#### Response:
```
{
    "id": 26,
    "song": "Respect",
    "original_artist": "Otis Redding",
    "release_year": 1965,
    "created_at": "2019-03-13T16:06:17.771Z",
    "updated_at": "2019-03-13T16:06:17.771Z"
}
```

### Endpoint:  ```POST /api/v1/songs```
#### Parameters:
```
{
    "song": "song",
    "original_artist": "artist",
    "release_year": "2019"
}
```
#### Response:
```
{
    "id": 72,
    "song": "song",
    "original_artist": "artist",
    "release_year": "2019"
}
```
 ### Endpoint:  ```GET /api/v1/covers```
#### Parameters: none
#### Response:
```
[
    {
        "id": 2,
        "song_id": 26,
        "cover_artist": "Ike & Tina Turner",
        "release_year": 1969,
        "created_at": "2019-03-13T16:06:17.797Z",
        "updated_at": "2019-03-13T16:06:17.797Z"
    },
    {
        "id": 4,
        "song_id": 28,
        "cover_artist": "Elvis Presly",
        "release_year": 1956,
        "created_at": "2019-03-13T16:06:17.798Z",
        "updated_at": "2019-03-13T16:06:17.798Z"
    },
    ...
]
```
### Endpoint:  ```GET /api/v1/covers/:id```
#### Parameters: none
#### Response:
```
{
    "id": 2,
    "song_id": 26,
    "cover_artist": "Ike & Tina Turner",
    "release_year": 1969,
    "created_at": "2019-03-13T16:06:17.797Z",
    "updated_at": "2019-03-13T16:06:17.797Z"
}
```
### Endpoint:  ```POST /api/v1/covers```
#### Parameters:
```
{
	"song_id": "26",
	"cover_artist": "cover artist",
	"release_year": "2019"
}
```
#### Response:
```
{
    "id": 86,
    "song_id": "26",
    "cover_artist": "cover artist",
    "release_year": "2019"
}
```
### Endpoint:  ```DELETE /api/v1/:db/:id```
#### Parameters: none
#### Response:
```"[Song/Cover] [number] removed"```